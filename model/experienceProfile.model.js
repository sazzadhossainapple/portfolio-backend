const mongoose = require('mongoose');

//schema design
const experienceProfileSchema = mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
        },
        company_name: {
            type: String,
            trim: true,
        },
        date_range: {
            type: String,
            trim: true,
        },
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
const ExperienceProfile = mongoose.model(
    'ExperienceProfile',
    experienceProfileSchema
);

module.exports = ExperienceProfile;
