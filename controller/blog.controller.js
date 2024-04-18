const asyncWrapper = require('../middleware/asyncWrapper');
const {
    getAllBlog,
    createBlog,
    findBlogBySlug,
    updateBlog,
    deleteBlog,
} = require('../service/blog.service');

/**
 * get all blog
 *
 * URI: /api/blog
 *
 * @param {req} req
 * @param {res} res
 * @param {next} next
 * @returns
 */
const index = asyncWrapper(async (req, res, next) => {
    try {
        let filters = { ...req.query };

        //  page, limit, -> exclude
        const excludeFields = ['page', 'limit'];
        excludeFields.forEach((field) => delete filters[field]);

        const queries = {};

        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ');
            queries.fields = fields;
        }

        if (req.query.page) {
            const { page = 1, limit = 6 } = req.query;
            const skip = (page - 1) * parseInt(limit);
            queries.skip = skip;
            queries.limit = parseInt(limit);
        }

        const blog = await getAllBlog(filters, queries);
        res.status(200).json({
            status: 'success',
            data: blog,
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: "can't get the data",
            error: error.message,
        });
    }
});

/**
 * create blog
 *
 * URI: /api/blog
 *
 * @param {req} req
 * @param {res} res
 * @param {next} next
 * @returns
 */

const store = asyncWrapper(async (req, res, next) => {
    const { description, title, img } = req.body;

    const aboutMe = await createBlog({
        description,
        title,
        img,
    });

    res.success(aboutMe, 'Blog create succssfully');
});

/**
 * get by blog
 *
 * URI: /api/blog/:id
 *
 * @param {req} req
 * @param {res} res
 * @param {next} next
 * @returns
 */

const getBySlug = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    const result = await findBlogBySlug(id);

    res.success(result, 'Blog successfully');
});

/**
 * update blog
 *
 * URI: /api/blog/:id
 *
 * @param {req} req
 * @param {res} res
 * @param {next} next
 * @returns
 */

const update = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    const { description, title, img } = req.body;

    const updateData = {
        description,
        title,
        img,
    };

    const result = await updateBlog(id, updateData);

    res.success(result, 'Blog update successfully');
});

/**
 * delete blog
 *
 * URI: /api/blog/:id
 *
 * @param {req} req
 * @param {res} res
 * @param {next} next
 * @returns
 */
const destroy = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    const result = await deleteBlog(id);
    if (!result.deletedCount) {
        throw new GeneralError("Could't delete the blog");
    }

    res.success(result, 'Blog delete successfully.');
});

module.exports = {
    index,
    store,
    destroy,
    update,
    getBySlug,
};
