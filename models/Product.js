const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        index: true
    },
    quantity: {
        type: String,
    },
    quantity_type: {
        type: String,
        index: true
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

const Product = module.exports = mongoose.model('Product', ProductSchema);