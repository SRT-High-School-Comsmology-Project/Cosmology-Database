require("dotenv").config();
const express = require("express");
const QueryDao = require("../data/QueryDao");
const ApiError = require("../models/ApiError");
const query = new QueryDao();
const router = express.Router();
const { connectionPool } = require('../data/db');


//QUERY TABLE API
router.get("/api/queries/:id", async (req, res, next) => {
    try {
		connectionPool.getConnection(async(err, connection) => {
			if (err) {
				console.error("Error getting connection pool connection" + connectionPool);
				throw err;
			}
        	const { id } = req.params;
        	if (isNaN(id)) {
        	    throw new ApiError(400, "The id needs to be a number");
        	}
        	const data = await query.read(id, connection);
			connection.release();
        	res.status(200).json({ data });
		});
    } catch (err) {
		console.error(err)
        next(err);
    }
});

router.post("/api/queries", async (req, res, next) => {
    try {
		connectionPool.getConnection(async(err, connection) => {
			if (err) {
				console.log("Error getting connection pool connection" + connectionPool);
				throw err;
			}
 	       	let { command, email } = req.body;
 	       	if (command === undefined || command === "") {
 	       	    throw new ApiError(400, "Require command string");
 	       	}
 	       	if (email === undefined || email === "") {
 	       	    throw new ApiError(400, "Require email to submit command");
 	       	}
 	       	let data = await query.create(command, email, connection);
 	       	data["command"] = command;
 	       	data["email"] = email;
			connection.release();
 	   	    res.status(200).json({ data });
		});
    } catch (err) {
		console.log(err);
        next(err);
    }
});
    
router.delete("/api/queries/:id", async (req, res, next) => {
    try {
		connectionPool.getConnection(async(err, connection) => {
			if (err) {
				console.log("Error getting connection pool connection" + connectionPool);
				throw err;
			}
        	const { id } = req.params;
  	      	const data = await query.delete(id, connection);
			connection.release();
  	      	res.status(200).json({ data });
		});
    } catch (err) {
		console.log(err);
        next(err);
    }
});

module.exports = router;
