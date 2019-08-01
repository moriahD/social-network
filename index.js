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
const s3 = require("./s3");
const config = require("./config");

/////////// for stroing uploaded file ///////////
var multer = require("multer"); //saving files to your harddrive
var uidSafe = require("uid-safe");
var path = require("path"); //
var diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

var uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});
/////////// END: for stroing uploaded file ///////////
app.use(require("body-parser").json());

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
app.post("/register", async (req, res) => {
    const { first, last, email, pass } = req.body;
    try {
        let hashedpw = await bc.hashPassword(pass);
        let user = await db.addUser(first, last, email, hashedpw);

        req.session.userId = user.rows[0].id;
        console.log("req.session.userId in register: ", req.session.userId);
        res.json({ success: true });
    } catch (err) {
        console.log("err in POST /registration", err);
    }
});

app.post("/login", function(req, res) {
    //first check if the user is
    db.getUserId(req.body.email)
        .then(result => {
            if (!result.rows[0]) {
                res.json({
                    error: "Something is wrong! Please try to type carefully."
                });
            } else {
                req.session.userId = result.rows[0].id;

                return result;
            }
        })
        .then(result => {
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
app.post("/uploader", uploader.single("file"), s3.upload, (req, res) => {
    if (req.file) {
        const url = config.s3Url + req.file.filename;

        console.log("url", url);
        // const { userId } = req.session.userId;
        // console.log("req.session.userId", userId);

        db.updateUserAvatar(url, req.session.userId)
            .then(() => {
                return res.json({ image: url });
            })
            .catch(err => {
                console.log("err for inserting avartar to data", err);
            });
    } else {
        console.log("Error in upload: ");
        res.status(500).json();
    }
    // res.json({ image });
});
app.get("/user", async function(req, res) {
    try {
        console.log("req.session.userId: ", req.session.userId);
        const user = await db.getUserById(req.session.userId);
        user.image = user.rows[0].image;
        console.log(user.rows[0].first_name);
        if (!user.image) {
            user.image = "/images/default.png";
        }
        res.json({ user });
    } catch (err) {
        console.log("Error Message in /user router: ", err);
    }
});
app.get("/user/:id.json", async function(req, res) {
    try {
        console.log("req.session.userId: ", req.session.userId);

        const user = await db.getUserById(req.params.id);

        user.image = user.rows[0].image;
        if (req.params.id == req.session.userId) {
            res.json({ sameUser: true });
        }
        console.log("req.params.id:", req.params.id);
        // if (!req.params.id) {
        //     res.json({ invalidUser: true });
        // }
        if (!user.image) {
            user.image = "/images/default.png";
        }
        res.json({ user });
    } catch (err) {
        console.log("Error Message in /otheruser router: ", err);
    }
});
app.get("/userslist.json", (req, res) => {
    db.mostRecentUsers()
        .then(data => {
            console.log("mostRecentUsers: ", data.rows);
            return res.json(data.rows);
        })
        .catch(err => {
            console.log("Error getting most recent user list: ", err);
        });
});
app.get("/userslist/:val.json", async function(req, res) {
    try {
        const usersList = await db.getMatchingUsers(req.params.val);
        console.log(req.params.val);
        res.json(usersList.rows);
    } catch (err) {
        console.log("Error getting getMatchingUsers: ", err);
    }
});
app.get("/friendshipList/:id.json", async function(req, res) {
    try {
        const getFriendshipInfo = await db.getFriendshipInfo(
            req.session.userId,
            req.params.id
        );
        if (getFriendshipInfo.rows.length == 0) {
            res.json({ button: "Send Friend Request to" });
        } else if (getFriendshipInfo.rows[0].accepted) {
            res.json({ button: "Unfriend" });
        } else if (getFriendshipInfo.rows[0].sender_id == req.session.userId) {
            res.json({ button: "Cancel Friend Request to" });
        } else {
            res.json({ button: "Accept Friend Request from" });
        }
        console.log("getFriendshipInfo:", getFriendshipInfo);
    } catch (err) {
        console.log("Error getting frienship info: ", err);
    }
});
app.post("/bio", async function(req, res) {
    const bio = req.body.bio;
    try {
        await db.updateBio(bio, req.session.userId);
        console.log("bio.", bio);
        return res.json({ bio });
    } catch (err) {
        console.log("Error Message in /bio router: ", err);
    }
});
app.get("/welcome", function(req, res) {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

// --------------- DO NOT DELETE THIS ------------------ //
app.get("*", function(req, res) {
    if (!req.session.userId && req.url != "/welcome") {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});
// --------------- DO NOT DELETE THIS ------------------ //
app.listen(8080, function() {
    console.log("I'm listening.");
});

// app.post("/register", function(req, res) {
//     bc.hashPassword(req.body.pass).then(hashedpw => {
//         return db
//             .addUser(req.body.first, req.body.last, req.body.email, hashedpw)
//             .then(results => {
//                 console.log(results);
//                 req.session.userId = results.rows[0].id;
//                 res.json({ success: true });
//             })
//             .catch(err => {
//                 console.log("err in registering: ", err);
//             });
//     });
//     // db.addUser(req.body.first, req.body.last, req.body.email, req.body.pass);
// });
