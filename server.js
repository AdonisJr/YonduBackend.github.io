require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', require('./routes/admin'));


app.listen(3000, () => {
    console.log(`Server is running at http://localhost:3000`);
})