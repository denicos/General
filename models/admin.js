const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Admin  Schema
const AdminSchema = mongoose.Schema({
    firstname: {
        type: String,
        index: true
    },
    lastname: {
        type: String,
    },
    username: {
        type: String,
        index: true
    },
    password: {
        type: String
    },
});

const Admin = module.exports = mongoose.model('Admin', AdminSchema);