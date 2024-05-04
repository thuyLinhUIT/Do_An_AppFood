const mongoose = require('mongoose');
const dataSchema = new mongoose.Schema({
    username: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String,
        // select:false
    },
    email: {
        required: true,
        type: String
    },
    avatar: {
        required: false,
        type: String
    },
    brithday: {
        required: true,
        type: Date
    }, gender: {
        required: false,
        type: String
    },
    phoneNumber: {
        required: false,
        type: String
    },
    favourite: [ {type: String} ]
})

module.exports = mongoose.model('user', dataSchema)