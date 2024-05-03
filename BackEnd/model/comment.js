const mongoose = require('mongoose');
const dataSchema = new mongoose.Schema({
    idMeal: {
        required: true,
        type: String
    },
    idUser: {
        required: true,
        type: String
    },
    username: {
        required: false,
        type: String
    },
    avatar: {
        required: false,
        type: String
    },
    date: {
        required: true,
        type: String,      
    },  
    content: {
        required: false,
        type: String
    },
})

module.exports = mongoose.model('comment', dataSchema)