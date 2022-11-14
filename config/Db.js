require('dotenv').config();

const mysql = require('mysql2')

const pool = mysql.createPool ({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database:process.env.DB_NAME,
    password:process.env.DB_PASSWORD
});

<<<<<<< HEAD
// tao lal taoget roi nha . clm sdsdwe
=======
// tao lal taoget roi nha . clmdfd
>>>>>>> 81b6b72dd7dab9444700fc1d8e8fa36330d11abd
module.exports = pool.promise();
