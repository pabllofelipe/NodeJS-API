const express = require('express')

async function index(req,res){
    res.status(201).send({
        message : "OK"
    });
};

module.exports = {
    index
}