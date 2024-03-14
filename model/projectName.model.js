const mongoose = require('mongoose');
const validator = require('validator');

//schema design
const projectNameSchema = mongoose.Schema(
    {
        category_id: {
            type: mongoose.Schema.Types.ObjectId,
            trim: true,
            required: [
                true,
                'please provide a category name for this category name',
            ],
            ref: 'ProjectCategory',
        },
        title: {
            type: String,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        github_clinet: {
            type: String,
            trim: true,
        },
        github_server: {
            type: String,
            trim: true,
        },
        live_link: {
            type: String,
            trim: true,
        },
        image: [String],

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
const ProjectName = mongoose.model('ProjectName', projectNameSchema);

module.exports = ProjectName;
