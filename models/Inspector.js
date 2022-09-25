const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Admin  Schema
const InspectorSchema = mongoose.Schema({
    name: {
        type: String,
        index: true
    },
    contact: {
        type: String,
    },
    address: {
        type: String,
    },
    status: {
        type: String,
        default: 'unapproved',
        enum: ['unapproved', 'approved']
    },
    CreatedAt: {
        type: Date,
        default: Date.now
    }
});

const Inspector = module.exports = mongoose.model('Inspector', InspectorSchema);