const mongoose = require('mongoose');
const validator = require('validator');

//schema design
const blogSchema = mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
        },
        description: {
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
const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
