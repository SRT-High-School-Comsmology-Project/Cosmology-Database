require("dotenv").config();
const mysql = require("mysql");
const connectionPool = mysql.createPool({
	connectionLimit: 100,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
});
/*
async function connect() {
    try { 
        connectionPool.createPool(function (err) {
            if (err) {
                console.error('error:' + err.message);
            }
        });
                    
    } catch (error) {
        console.log(error);
    } 
}*/

module.exports = { connectionPool }