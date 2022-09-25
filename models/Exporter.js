const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Admin  Schema
const ExporterSchema = mongoose.Schema({
    company_name: {
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

const Exporter = module.exports = mongoose.model('Exporter', ExporterSchema);