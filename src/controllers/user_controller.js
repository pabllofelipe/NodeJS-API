const db = require('../database/index');
const express = require('express');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const authConfig = require('../config/auth.json')
const saltRounds = 10;

async function createUser(req,res){
    const { username, email, password } = req.body;
    const { rows } = await db.query(
        "SELECT * FROM users WHERE email = $1",
        [email]);
    if(rows.length == 0) {
        let hash = await bcrypt.hash(password, saltRounds)
        const {rows} = await db.query(
            "INSERT INTO users (username, email, password, created_on) VALUES ($1, $2, $3, $4)",
            [username, email, hash, new Date()]);
        res.status(201).send({
            message: "User created successfully!"
        });
    }else{
        res.status(404).send(
            {
                message: "User already exists"
            });
    }
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
        rows[0].password = undefined
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

async function updateUser(req,res){
    const {username, email, password} = req.body;
};

async function login(req,res){
    const { user_email, password} = req.body;
    const { rows } = await db.query(
        "SELECT * FROM users WHERE email = $1",
        [user_email]);

    if(rows.length > 0)
    {
        if (!await bcrypt.compare(password,rows[0].password)){
            res.status(400).send(
                {
                    message : "Wrong email or password!"
                }
            )
        }else{
            rows[0].password = undefined
            const token = jwt.sign({email: user_email},authConfig.secret,{
                expiresIn: 86400,
            });
            res.status(201).send(
                {
                    message: "login successful",
                    rows,
                    token
                }
            )
        };
    }else
    {
        res.status(404).send(
            {
                message: "User not found"
            }
        )
    }
}

module.exports = {
    createUser,
    findUser,
    deleteUser,
    updateUser,
    login
}