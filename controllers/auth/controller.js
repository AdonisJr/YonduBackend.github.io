const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../../database/database');
const JWT = require('../../middlewares/jwt');

router.post('/token', (req, res) => {
    // check if the required parameter are empty
    if (!req.body.email || !req.body.password)
        return res.status(422).json({ status: 422, message: 'Parameter Required ( email, password )' })

    const email = req.body.email;
    const password = req.body.password;

    const sql = `SELECT * FROM users where email = ?`

    db.query(sql, email, async(err, rows) => {
        if (err) return console.log(err.message)

        // error handling for invalid email address
        if (rows == 0) return res.status(400).json({ status: 400, message: 'Invalid email address' })

        const isValid = await bcrypt.compare(password, rows[0].password)

        // data that will send if no error, password excluded for security purpose
        const data = {
            user_id: rows[0].user_id,
            first_name: rows[0].first_name,
            middle_name: rows[0].middle_name,
            last_name: rows[0].last_name,
            age: rows[0].age,
            email: rows[0].email,
            role: rows[0].role,
        };

        // error handling for invalid password
        if (!isValid) return res.status(400).json({ status: 400, message: 'Invalid password' });

        // function to get access token
        const accessToken = JWT.getAccessToken(data.user_id);

        // if no error send 200 response
        res.status(200).json({ status: 200, accessToken, message: 'Successfully login', data: data });

    })
})

module.exports = router;