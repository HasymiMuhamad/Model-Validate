const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
const saltRounds = 10;


const userSchema = new Schema({
    username: {
        type: String,  
        required: true,  
        max: 100, 
        lowercase: true,
        match: /^[a-zA-Z0-9]+$/, 
        index: true,
        unique: true, 
        uniqueCaseInsensitive: true,
        min: 3,
        max: 20   
    },

    password: {
        type: String, 
        required: true, 
        min: 3, 
        max: 20 
    },

    email: { 
        type: String, 
        lowercase: true, 
        required: true, 
        match: /\S+@\S+\.\S+/, 
        index: true,
        unique: true,
        min: 3, 
        max: 20

    }
})

userSchema.pre('save',function (next) {
    console.log(this)
    this.username = this.username.toLowerCase();
    this.password = bcrypt.hashSync(this.password, saltRounds)
    next()
})

userSchema.plugin(uniqueValidator)


module.exports = mongoose.model('User', userSchema);

