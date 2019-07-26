var spicedPg = require("spiced-pg");
var db;
if (process.env.DATABASE_URL) {
    db = spicedPg(process.env.DATABASE_URL);
} else {
    db = spicedPg("postgres:moriah:1234@localhost:5432/socialnetwork");
}

exports.addUser = function addUser(first_name, last_name, email, password) {
    return db.query(
        `INSERT INTO users (first_name, last_name, email, password)
            VALUES ($1, $2, $3, $4 ) RETURNING *;`,
        [first_name, last_name, email, password]
    );
};

//Login
exports.getUserId = function(email) {
    return db.query("SELECT * FROM users WHERE email = $1", [email]);
};

exports.getUserById = function getUserById(id) {
    return db.query(
        `SELECT image, first_name, last_name FROM users WHERE id = $1`,
        [id]
    );
};
exports.updateUserAvatar = function updateUserAvatar(image, id) {
    return db.query(`UPDATE users SET image = $1  WHERE id = $2`, [image, id]);
};
