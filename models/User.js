const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: { 
        type: String,
        required: true
    },
    contact_number: {
        type: String,
        required: true
    }

}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);