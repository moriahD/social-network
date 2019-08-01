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
        `SELECT image, first_name, last_name, bio FROM users WHERE id = $1`,
        [id]
    );
};
exports.updateUserAvatar = function updateUserAvatar(image, id) {
    return db.query(`UPDATE users SET image = $1  WHERE id = $2`, [image, id]);
};
exports.updateBio = function updateBio(bio, id) {
    return db.query(`UPDATE users SET bio = $1  WHERE id = $2`, [bio, id]);
};
exports.mostRecentUsers = function mostRecentUsers() {
    return db.query(`SELECT * FROM users ORDER BY id DESC LIMIT 3`);
};

exports.getMatchingUsers = function getMatchingUsers(val) {
    return db.query(
        `SELECT first_name, last_name, image FROM users WHERE first_name ILIKE $1 OR last_name ILIKE $1;`,
        [val + "%"]
    );
};

exports.getFriendshipInfo = function getFriendshipInfo(sender_id, receiver_id) {
    return db.query(
        `SELECT * FROM friendships WHERE (sender_id=$1 AND receiver_id=$2) OR (sender_id=$2 AND receiver_id = $1)`,
        [sender_id, receiver_id]
    );
};
//another query for inserting BOOLEAN when frienship is requested
exports.requestFriendship = function requestFriendship(sender_id, receiver_id) {
    return db.query(
        `INSERT INTO friendships (sender_id, receiver_id) VALUES ($1, $2) RETURNING *`,
        [sender_id, receiver_id]
    );
};

// query for when friendship is accepted
exports.acceptFriendship = function acceptFriendship(receiver_id, sender_id) {
    return db.query(
        `UPDATE friendships SET accepted = TRUE  WHERE (receiver_id=$1 AND sender_id=$2 AND accepted = FALSE) RETURNING *`,
        [receiver_id, sender_id]
    );
};

// // query for when friendship is canceled
exports.cancelRequest = function cancelRequest(sender_id, receiver_id) {
    return db.query(
        `DELETE FROM friendships WHERE (sender_id = $1 AND receiver_id = $2) OR (sender_id = $2 AND receiver_id = $1);`,
        [sender_id, receiver_id]
    );
};
