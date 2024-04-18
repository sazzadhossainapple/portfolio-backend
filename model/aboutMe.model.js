const mongoose = require('mongoose');
const validator = require('validator');

//schema design
const aboutMeSchema = mongoose.Schema(
    {
        description: {
            type: String,
            trim: true,
        },
        experience: {
            type: String,
            trim: true,
        },
        project: {
            type: String,
            trim: true,
        },
        img: {
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
const AboutMe = mongoose.model('AboutMe', aboutMeSchema);

module.exports = AboutMe;
