const mongoose = require('mongoose');
const validator = require('validator');

//schema design
const experienceSchema = mongoose.Schema(
    {
        experience_name: {
            type: String,
            trim: true,
        },
        title: {
            type: String,
            trim: true,
        },
        sub_title: {
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
const Experience = mongoose.model('Experience', experienceSchema);

module.exports = Experience;
