require('dotenv').config();
const express = require('express');
const ApiError = require('../models/ApiError');
const ResultsDao = require('../data/ResultsDao');
const results = new ResultsDao();
const router = express.Router();
const { connectionPool } = require('../data/db');

//Reads either entire results or results filtered by command
router.get('/api/results', async (req, res, next) => {
    try {
		connectionPool.getConnection(async(err, connection) => {
			if (err) {
				console.error("Error getting connection pool connection" + connectionPool);
				throw err;
			}
        	const { command } = req.body;
        	if (command === undefined || command === '') {
        	    const data = await results.readAll(connection);
				connection.release();
        	    res.status(200).json({ data });
        	} else {
        	    const data = await results.read(command, connection);
				connection.release();
        	    res.status(200).json({ data });
        	}
		});
    } catch (err) {
		console.error(err);
		next(err);
    }
});

router.post('/api/results', async (req, res, next) => {
    try {
		connectionPool.getConnection(async(err, connection) => {
			if (err) {
				console.error("Error getting connection pool connection" + connectionPool);
				throw err;
			}
	        let { command } = req.body;
	        if (command === undefined || command === '') {
	            throw new ApiError(400, 'Require command string');
	        }

        	const data = await results.create(command, connection);
			connection.release();
        	res.status(200).json({ data });
		});
    } catch (err) {
		console.error(err);
        next(err);
    }
});

router.put('/api/results/:id', async (req, res, next) => {
    try {
		connectionPool.getConnection(async(err, connection) => {
			if (err) {
				console.error("Error getting connection pool connection" + connectionPool);
				throw err;
			}
	        const { id } = req.params;
	        let { data, image } = req.body;

        	if (data === undefined && image === undefined) {
        	    throw new ApiError(400, 'Require values inorder to update');
        	}
 	       	data = await results.update(id, { data, image }, connection);
			connection.release();
 	    	res.status(200).json({ data });
		});
    } catch (err) {
		console.error(err);
		next(err);
    }
});

router.delete('/api/results/:id', async (req, res, next) => {
    try {
		connectionPool.getConnection(async(err, connection) => {
			if (err) {
				console.error("Error getting connection pool connection" + connectionPool);
				throw err;
			}
        	const { id } = req.params;
        	const data = await results.delete(id, connection);
			connection.release();
        	res.status(200).json({ data });
		});
    } catch (err) {
		console.error(err);
		next(err);
    }
});

module.exports = router;
