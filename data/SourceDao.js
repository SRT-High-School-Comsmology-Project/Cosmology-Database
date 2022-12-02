const connection = require("./db").connection
const ApiError = require("../models/ApiError");
const table = process.env.MYSQL_TABLE_SOURCE;

class SourceDao {
    async create(source, connection) {
        const query = new Promise((resolve, reject) => {
            connection.query(`INSERT INTO ${table} (sources) VALUES (\"${source}\")`, (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {
                    resolve({"resultsID": results.insertId});
                }
            });
        });
        return query;
    }

    async readAll(connection) {
        const query = new Promise((resolve, reject) => { 
            connection.query(`SELECT * FROM ${table}`, (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {
                    resolve({"results": results});
                }
            });
        });
        return query;
    }

    async deleteAll(connection) {
        const query = new Promise((resolve, reject) => { 
            let table_query = `DROP TABLE IF EXISTS ${table}; CREATE TABLE ${table} (sources TEXT NOT NULL);`
            connection.query(table_query, (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {
                    resolve({"results": results});
                }
            });
        });
        return read;
    }

}


module.exports = SourceDao;