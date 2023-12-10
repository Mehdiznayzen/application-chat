const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName : {
        type : 'string',
        required : true,
        min : 3, 
        max : 20,
        unique : true
    },
    email : {
        type : 'string',
        required : true,
        max : 20,
        unique : true
    },
    pasword : {
        type : 'string',
        required : true,
        max : 8
    },
    isAvatarImage : {
        type : 'boolean',
        default : false,
    },
    avatarImage : {
        type : 'string',
        default : ""
    }
})

module.exports = mongoose.model('Users', userSchema)