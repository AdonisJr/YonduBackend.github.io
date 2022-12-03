const db = require('../database/database');

exports.ifEmailExist = (req, res, next) => {
    const sql = `SELECT * FROM users where email = ?`;

    db.query(sql, req.body.email, (err, rows) => {
        if (err) return console.log(err.message)

        if (rows.length == 0) return next()

        res.status(409).json({ status: 409, message: 'Conflict, Email already exist' })
    })
}
exports.ifUserNameExist = (req, res, next) => {
    const sql = `SELECT * FROM users where user_name = ?`;

    db.query(sql, req.body.user_name, (err, rows) => {
        if (err) return console.log(err.message)

        if (rows.length == 0) return next()

        res.status(409).json({ status: 409, message: 'Conflict, User Name already exist' })
    })
}