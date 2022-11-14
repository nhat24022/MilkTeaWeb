require('dotenv').config();

const mysql = require('mysql2')

const pool = mysql.createPool ({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database:process.env.DB_NAME,
    password:process.env.DB_PASSWORD
});

// tao lal taoget roi nha . clm sdsdwe
module.exports = pool.promise();
