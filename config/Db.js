require('dotenv').config();

const mysql = require('mysql2')

const pool = mysql.createPool ({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database:process.env.DB_NAME,
    password:process.env.DB_PASSWORD
});

<<<<<<< HEAD
// dc mmm
=======
// dc mm lll

>>>>>>> a87ff509856d382fd0df5078a12a6fbda92b9f98
module.exports = pool.promise();
