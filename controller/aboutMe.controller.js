const asyncWrapper = require('../middleware/asyncWrapper');
const {
    getAllAboutMe,
    createAboutMe,
    findAboutMeBySlug,
    updateAboutMe,
    deleteAboutMe,
} = require('../service/aboutMe.service');

/**
 * get all about me
 *
 * URI: /api/about-me
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

        const aboutMe = await getAllAboutMe(filters, queries);
        res.status(200).json({
            status: 'success',
            data: aboutMe,
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
 * create about me
 *
 * URI: /api/about-me
 *
 * @param {req} req
 * @param {res} res
 * @param {next} next
 * @returns
 */

const store = asyncWrapper(async (req, res, next) => {
    const { description, experience, project, img } = req.body;

    const aboutMe = await createAboutMe({
        description,
        experience,
        project,
        img,
    });

    res.success(aboutMe, 'About me create succssfully');
});

/**
 * get by about me
 *
 * URI: /api/about-me/:id
 *
 * @param {req} req
 * @param {res} res
 * @param {next} next
 * @returns
 */

const getBySlug = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    const result = await findAboutMeBySlug(id);

    res.success(result, 'About me successfully');
});

/**
 * update about me
 *
 * URI: /api/about-me/:id
 *
 * @param {req} req
 * @param {res} res
 * @param {next} next
 * @returns
 */

const update = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    const { description, experience, project, img } = req.body;

    const updateData = {
        description,
        experience,
        project,
        img,
    };

    const result = await updateAboutMe(id, updateData);

    res.success(result, 'About me update successfully');
});

/**
 * delete about me
 *
 * URI: /api/about-me/:id
 *
 * @param {req} req
 * @param {res} res
 * @param {next} next
 * @returns
 */
const destroy = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    const result = await deleteAboutMe(id);
    if (!result.deletedCount) {
        throw new GeneralError("Could't delete the about me");
    }

    res.success(result, 'About me delete successfully.');
});

module.exports = {
    index,
    store,
    destroy,
    update,
    getBySlug,
};
