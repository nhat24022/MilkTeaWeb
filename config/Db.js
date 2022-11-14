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
module.exports = pool.promise();
=======
// dc mm lll

>>>>>>> a7bf368cfa574b0bf2d8b8f68f790eeddfd306e0
