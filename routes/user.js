//If admin return the id of the user as well
const express = require('express');
const ApiError = require('../models/ApiError');
const UserDao = require('../data/UserDao');
const user = new UserDao();
const router = express.Router();
const { checkAdmin } = require("../util/middleware")
const { connectionPool } = require('../data/db');

//Gets all registered users. Only admin can do
router.get('/api/users', checkAdmin, async (req, res, next) => {
    try {
		connectionPool.getConnection(async(err, connection) => {
			if (err) {
				console.error("Error getting connection pool connection" + connectionPool);
				throw err;
			}
        	let users = await user.readAll(connection);
			connection.release();
        	res.status(200).json({users: users});
		});
    } catch (err) { 
		console.error(err);
        next(err);
    }
});

//Used to create new user. Only admin can do
router.post('/api/users', checkAdmin, async(req, res, next) => {
    try {
		connectionPool.getConnection(async(err, connection) => {
			if (err) {
				console.error("Error getting connection pool connection" + connectionPool);
				throw err;
			}
    	    let { username, role } = req.body;
    	    if (role === undefined) {
    	        role  = req.body.data.attributes.role;
    	    }
    	    const newUser = await user.create(username, role, connection);
			connection.release();
    	    res.status(200).json({user: newUser});
		});
    } catch (err) {
        console.log(err)
        next(err);
    }
});

//Used to update password - No one can update :(
/*
router.put('/api/users', async(req, res, next) => {
    try {
        let username = req.body.username;
        let password = req.body.password;
        await user.update(username, password);
        res.status(200);
    } catch (err) {
        next(err);
    }
});*/


//Deletes a user. Only Admin can do
router.delete('/api/users/:id', checkAdmin, async(req, res, next) => {
    try {
		connectionPool.getConnection(async(err, connection) => {
			if (err) {
				console.error("Error getting connection pool connection" + connectionPool);
				throw err;
			}
        	const { id } = req.params;

        	if (id == undefined) {
        	    throw new ApiError(400, "Id required to delete");
        	}

        	await user.delete(id);
			connection.release();
        	res.status(200).json({id: id});
		});
    } catch (err) {
        console.log(err)
        next(err);
    }
    
});

module.exports = router;