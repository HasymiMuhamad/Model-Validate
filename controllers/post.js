const Posting = require('../models/post');
const User = require('../models/user');
const fs = require('fs');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const Ajv = require('ajv');
const mongoose = require('mongoose');
const memberValidate = require('../scheme/user');
var jwt = require('jsonwebtoken');
const userSchema = require('../scheme/user.json');
require('dotenv').config()


exports.dataUpdate = function (req, res, next) {
    Posting.findByIdAndUpdate(req.params.id, {$set: {dataTitle : req.body.dataTitle}}, function (err, data) {
        if (err) {
            console.log(err)
            return next(err);
        } else {
            res.json({
                success: true,
                message: "success"
            })
        }
    });
};

exports.dataFindAll = function(req, res){
    Posting.find()
    .then(function(data){
        res.status(200).json({
            success: true,
            data: data
        })
    })
    .catch(function(err){
        res.status(500).json({
            success: false,
            message: err.message || "Internal Error"
        })
    })
}

exports.dataPost = function (req, res, next){
    console.log(req.body)
    var post = new Posting (
        {
            dataTitle : req.body.dataTitle,
            dataContent : req.body.dataContent,
            dataWriter : req.body.dataWriter,
            image : req.file ? req.file.filename : null
        
        }
    );

    post.save(function(err){
        if (err){
            console.log(err)
            return next(err);
        }
        res.json({
            success: true,
            message: "success"
        })
        
        // fs.writeFile(`public/${req.body.id}.jpg`, function (err){
        //     if (err) throw err;
        //     console.log('New file is created !!');
        // })
    })
};



exports.dataDetails = function (req, res,next) {
    Posting.findById({_id : req.params.id}, function (err, post) {
        if (err) {
            console.log(err)
            return next(err);
        } else {
            res.json(post);
            }
        
    })
};



exports.dataDelete = function (req, res,next) {
    Posting.findOneAndDelete({_id : req.params.id}, function (err) {
        if (err) {
            console.log(err)
            return next(err);
        }
        res.json({
            success: true,
            message: "success"
        })
        //fs.unlinkSync(`public/${req.params.id}.jpg`);  
        
    })
};
