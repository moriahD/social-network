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

app.listen(8080, function() {
    console.log("I'm listening.");
});
