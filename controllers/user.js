const postModels = require('../models/post');
const User = require('../models/user');
const fs = require('fs');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');


exports.userCreate = function(req, res, next){
    let user = new User ({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    })
    user.save(function(err){
       if (err){
           console.log(err)
           res.status(422).json({
               success: false,
               message: err.message || "error"
           })
       }else{ res.send({ 
           success: true,
           message: "succes"
       })}

    })
    
}

exports.userUpdate = function(req, res){
    User.findByIdAndUpdate(req.body.id, {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        image: req.file ? req.file.filename : null
    })
    .then(function(){
        res.json({
            success: true,
            message: "User Data is updated succesfully"
        })
    })
    .catch(function(err){
        res.status(500).json({
            success: false,
            message: "User Data update is failed"
        })
    })
}


exports.userFindAll = function(req, res){
    User.find()
    .then(function(user){
        res.status(200).json({
            success: true,
            user: user
        })
    })
    .catch(function(err){
        res.status(500).json({
            success: false,
            message: err.message || "Internal Error"
        })
    })
}

exports.userDelete = function(req, res){
    User.findOneAndDelete({ '_id': req.body.id})
    .then(function(){
        fs.unlink('')
        res.json({
            success: true,
            message: "User Data is deleted succesfully"
        })
    })
    .catch(function(err){
        res.status(500).json({
            success: false,
            message: err.message || "Delete process is failed"
        })
    })
}


exports.Test = function(req, res, next){
    res.json({message : "connection succes"});
    next();
}



exports.userLogin = (req, res) => {
    User.findOne({ username: req.body.username }, (err, userNote) => {
     if (err) {
      return res.status(400).json({
       success: false,
       message: 'error'
      })
   
     } else {
      if (!userNote) {
       return res.status(400).json({
        message: 'User not found'
       })
      }
   
      bcrypt.compare(req.body.password, userNote.password)
       .then((valid) => {
        if (!valid) {
         return res.status(400).json({
          success: false,
          message: 'Wrong Password'
         })
        }
   
        const token = jwt.sign({ id: userNote._id }, 'jwtsecret', { expiresIn: '30d' })
        return res.status(200).json({
         success: true,
         token : token
        })
       })
       .catch(err => {
        return res.status(400).json({
         success: false,
         message: 'Password required to login'
        })
       })
     }
    })
   }




