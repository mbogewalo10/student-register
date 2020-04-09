const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstname: {type: String},
    lastname: {type: String},
    email:{type: String, 
        unique:true, 
        required:true,
     match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/},
    password:{type: String, required:true}
})

userSchema.plugin(uniqueValidator , { message: 'Email already in use.' });
module.exports = mongoose.model('User', userSchema)