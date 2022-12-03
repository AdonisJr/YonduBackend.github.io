const db = require('../database/database');

exports.ifUserExist = (req, res, next) => {
    const sql = `SELECT * FROM users WHERE user_id = ?`
    const user_id = [req.params.user_id]
    db.query(sql, user_id, (err, rows) => {
        if (err) return console.log(err.message)

        if (rows.length == 0) return res.status(404).json({ status: 404, message: "User ID not found" })

        return next()

    })
}