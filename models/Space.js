const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Admin  Schema
const SpaceSchema = mongoose.Schema({
    country: {
        type: String,
    },
    airline: {
        type: String,
        index: true
    },
    departure_date: {
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

const Space = module.exports = mongoose.model('Space', SpaceSchema);