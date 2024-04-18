const Blog = require('../model/blog.model');

// get all Blog
const getAllBlog = async (filters, queries) => {
    const blog = await Blog.find(filters).sort({
        createdAt: -1,
        updatedAt: -1,
    });

    const totalBlog = await Blog.countDocuments(filters);
    const page = Math.ceil(totalBlog / queries.limit);
    return { totalBlog, page, blog };
};

const createBlog = async (project) => {
    const blog = await Blog.create(project);
    return blog;
};

const findBlogBySlug = async (id) => {
    return await Blog.findOne({ _id: id });
};
const updateBlog = async (id, data) => {
    return await Blog.updateOne(
        { _id: id },
        { $set: data },
        {
            runValidators: true,
        }
    );
};

// delete by id
const deleteBlog = async (id) => {
    const result = await Blog.deleteOne({ _id: id });
    return result;
};

module.exports = {
    getAllBlog,
    createBlog,
    findBlogBySlug,
    updateBlog,
    deleteBlog,
};
