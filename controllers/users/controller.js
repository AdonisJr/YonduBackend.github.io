const express = require('express');
const router = express.Router();
const db = require('../../database/database');
const bcrypt = require('bcrypt');
const verify = require('../../middlewares/verifyUniqueParameters');
const JWT = require('../../middlewares/jwt');
const checkUser = require('../../middlewares/checkUser');

router.route('/users')
    // GET ALL USERS
    .get(JWT.verifyAccessToken, async(req, res) => {
        const sql = `SELECT * FROM users WHERE user_id != ?`

        db.query(sql, req.user, (err, rows) => {

            if (err) return console.log(err.message);

            return res.status(200).json({
                status: 200,
                message: `Successfully retrieved ( ${rows.length} records )`,
                data: rows
            })
        })

    })
    // ADD NEW USER
    .post(
        verify.ifEmailExist,
        verify.ifUserNameExist,
        async(req, res) => {

            // CHECK REQUIRED PARAMETER
            if (!req.body.first_name || !req.body.last_name ||
                !req.body.email || !req.body.user_name || !req.body.password)
                return res.status(422).json({
                    status: 422,
                    message: 'Parameter Required ( first_name, last_name, email, user_name, password )'
                })

            // encrypt password using bcrpt and put assigned it to hash variable.

            let hash = await bcrypt.hash(req.body.password, 13);

            // SET DATA FROM BODY TO credentials array
            const credentials = [
                req.body.first_name,
                req.body.last_name,
                req.body.address,
                req.body.post_code,
                req.body.contact_number,
                req.body.email,
                req.body.user_name,
                hash
            ]

            const sql = `INSERT INTO users (first_name, last_name, address, post_code, contact_number, email, user_name, password)
                    values (?, ?, ?, ?, ?, ?, ?, ?)`

            db.query(sql, credentials, (err, rows) => {

                if (err) return console.log(err.message);

                return res.status(201).json({ status: 201, message: 'Successfully created', data: rows })
            })

        })
    // DELETE MULTIPLE USERS
    .delete(JWT.verifyAccessToken, async(req, res) => {

        const sql = `DELETE FROM users WHERE user_id IN (?);`
        const users = [req.body.users]

        db.query(sql, users, (err, rows) => {
            if (err) return console.log(err.message)

            return res.status(200).json({ status: 200, message: `Successfully deleted ( ${rows.affectedRows} record/s )` })
        })
    })


router.route('/users/:user_id')
    // UPDATE USER INFORMATION
    .put(JWT.verifyAccessToken, checkUser.ifUserExist, async(req, res) => {

        // CHECK REQUIRED PARAMETER

        if (!req.body.first_name || !req.body.last_name || !req.body.password)
            return res.status(422).json({
                status: 422,
                message: 'Parameter Required ( first_name, last_name, password )'
            })

        // YOU CAN'T UPDATE UNIQUE FIELDS (email, user_name)
        const sql = `UPDATE users SET first_name = ?, last_name = ?, address = ?, post_code = ?,
            contact_number = ? WHERE user_id = ?`

        const credentials = [
            req.body.first_name,
            req.body.last_name,
            req.body.address,
            req.body.post_code,
            req.body.contact_number,
            req.params.user_id
        ];

        db.query(sql, credentials, (err, rows) => {
            if (err) return console.log(err.message);
            return res.status(200).json({ status: 200, message: 'Successfully updated' })
        })

    })
    // DELETE SPECIFIC USER
    .delete(JWT.verifyAccessToken, checkUser.ifUserExist, async(req, res) => {
        const sql = `DELETE FROM users where user_id = ?`

        db.query(sql, req.params.user_id, (err, rows) => {
            if (err) return console.log(err.message)
            return res.status(200).json({ status: 200, message: 'Successfully deleted' })
        })
    })

module.exports = router;