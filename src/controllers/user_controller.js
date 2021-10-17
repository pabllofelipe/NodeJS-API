const db = require('../database/index');
const express = require('express');
const router = express.Router();

async function createUser(req,res){
    const { username, email, password } = req.body;
    const { rows } = await db.query(
        "INSERT INTO users (username, email, password, created_on) VALUES ($1, $2, $3, $4)",
        [username, email, password, new Date()]);

    res.status(201).send({
        message: "User created successfully!",
        user: { username, email, password }
    });
};

async function findUser(req,res){
    let user_email
    if(req.params.id.includes('@'))
    {
        user_email = req.params.id
    }
    const { rows } = await db.query(
        "SELECT * FROM users WHERE email = $1",
        [user_email]);

    if(rows.length > 0)
    {
        res.status(201).send(
            rows
        );
    }else
    {
        res.status(404).send(
            {
                message: "User not found"
            }
        )
    }
};

async function deleteUser(req,res){
    let user_email
    if(req.params.id.includes('@'))
    {
        user_email = req.params.id
    }
    const result = await db.query(
        "DELETE FROM users WHERE email = $1",
        [user_email]);

    if(result.rowCount > 0)
    {
        res.status(201).send({
                message: `User ${user_email} has been deleted`
            }
        );
    }else
    {
        res.status(404).send(
            {
                message: "That user doesn't exists"
            }
    )
    }
};
module.exports = {
    createUser,
    findUser,
    deleteUser
}