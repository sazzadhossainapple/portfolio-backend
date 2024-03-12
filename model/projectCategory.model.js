const mongoose = require('mongoose');
const validator = require('validator');

//schema design
const projectCategorySchema = mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
        },

        slug: {
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
const ProjectCategory = mongoose.model(
    'ProjectCategory',
    projectCategorySchema
);

module.exports = ProjectCategory;
