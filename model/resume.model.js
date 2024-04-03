const mongoose = require('mongoose');
const validator = require('validator');

//schema design
const resumeSchema = mongoose.Schema(
    {
        link: {
            type: String,
            trim: true,
        },
        status: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

//SCHEMA -> MODEL -> QUERY
const Resume = mongoose.model('Resume', resumeSchema);

module.exports = Resume;
