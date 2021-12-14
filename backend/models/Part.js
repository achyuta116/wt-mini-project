const mongoose = require('mongoose');

const partSchema = new mongoose.Schema({
    vendorEmail: {
        type: String,
        required: true,
        lowercase: true
    },
    partType: {
        type: String, 
        required: true,
        lowercase: true
    },
    partName:{
        type: String, 
        required: true,
    },
    partDescription:{
        type: String, 
        required: true,
    }
})

const Part = mongoose.model('part', partSchema);

module.exports = Part