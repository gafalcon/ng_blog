const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
// const Joi = require('joi');
const Enum = require('enum');
const Schema = mongoose.Schema;
const USER_ROLE = new Enum({
    'REGULAR_USER': 1,
    'ADMIN': 2
});
let UserSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    photoUrl: {type: String, required: false},
    role: {type: Number, required: false}
})

//custom method to generate authToken
UserSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id, role: this.role }, process.env.PRIVATE_KEY); //get the private key from the config file -> environment variable
    return token;
}

exports.User = mongoose.model('User', UserSchema);
exports.USER_ROLE = USER_ROLE;
