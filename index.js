const express = require("express");
const app = express();
const compression = require("compression");
const db = require("./utils/db");
const bc = require("./utils/bc");
var cookieSession = require("cookie-session");
const csurf = require("csurf");
app.use(require("body-parser").json());

app.use(express.static("./public"));
app.set("view engine", "handlebars");
app.use(compression());
app.use(
    cookieSession({
        secret: "I'm always angry.",
        maxAge: 1000 * 60 * 60 * 24 * 14
    })
);
app.use(csurf());

app.use(function(req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.get("*", function(req, res) {
    if (!req.session.userId && req.url != "/welcome") {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});
app.get("/welcome", function(req, res) {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});
app.post("/register", function(req, res) {
    bc.hashPassword(req.body.pass).then(hashedpw => {
        return db
            .addUser(req.body.first, req.body.last, req.body.email, hashedpw)
            .then(results => {
                console.log(results);
                req.session.userId = results.rows[0].id;
                res.json({ success: true });
                console.log("ciao, i'm here");
            })
            .catch(err => {
                console.log("err in registering: ", err);
            });
    });
    // db.addUser(req.body.first, req.body.last, req.body.email, req.body.pass);
});

app.post("/login", function(req, res) {
    //first check if the user is
    console.log("req.body.email:", req.body.email);
    db.getUserId(req.body.email)
        .then(result => {
            if (!result.rows[0]) {
                res.json({
                    error: "Something is wrong! Please try to type carefully."
                });
            } else {
                req.session.userId = result.rows[0].id;
                //console.log("id", req.session.userId);
                return result;
            }
        })
        .then(result => {
            console.log("req.body.password", result);
            bc.checkPassword(req.body.pass, result.rows[0].password)
                .then(results => {
                    if (!results) {
                        res.json({
                            error: true
                        });
                    } else {
                        res.json({ success: true });
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        });
});

app.listen(8080, function() {
    console.log("I'm listening.");
});
