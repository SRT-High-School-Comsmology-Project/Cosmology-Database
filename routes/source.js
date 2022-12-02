require('dotenv').config();
const express = require('express');
const SourceDao = require('../data/SourceDao');
const source = new SourceDao();
const router = express.Router();
const { connectionPool } = require('../data/db');

router.get('/api/sources', async (req, res, next) => {
  try {
	connectionPool.getConnection(async(err, connection) => {
		if (err) {
			console.error("Error getting connection pool connection" + connectionPool);
			throw err;
		}
    		const data = await source.readAll(connection);
    		res.status(200).json(data);
		});
  	} catch (err) {
		console.log(err);
    	next(err);
  	}
});

module.exports = router;
