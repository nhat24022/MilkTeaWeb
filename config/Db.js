require('dotenv').config();

const mysql = require('mysql2')

const pool = mysql.createPool ({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database:process.env.DB_NAME,
    password:process.env.DB_PASSWORD
});

<<<<<<< HEAD
// dc mm
=======
// dc ll
>>>>>>> f65225db46f83d64401b1b59c2aadba8ff2534b1
module.exports = pool.promise();
