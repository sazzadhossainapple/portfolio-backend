const asyncWrapper = require('../middleware/asyncWrapper');
const {
    getAllExperience,
    createExperience,
    findExperienceBySlug,
    deleteExperience,
    updateExperience,
} = require('../service/experience.service');

/**
 * get all experience
 *
 * URI: /api/experience
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

        /* Search on the  of  experience_name  */
        if (req.query.experience_name) {
            queries.experience_name = new RegExp(queries.experience_name, 'i');
        }

        if (req.query.page) {
            const { page = 1, limit = 6 } = req.query;
            const skip = (page - 1) * parseInt(limit);
            queries.skip = skip;
            queries.limit = parseInt(limit);
        }

        const experience = await getAllExperience(filters, queries);
        res.status(200).json({
            status: 'success',
            data: experience,
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
 * create experience
 *
 * URI: /api/experience
 *
 * @param {req} req
 * @param {res} res
 * @param {next} next
 * @returns
 */

const store = asyncWrapper(async (req, res, next) => {
    const { experience_name, title, sub_title } = req.body;

    const experience = await createExperience({
        experience_name,
        title,
        sub_title,
    });

    res.success(experience, 'Experience create succssfully');
});

/**
 * get by experience
 *
 * URI: /api/experience/:id
 *
 * @param {req} req
 * @param {res} res
 * @param {next} next
 * @returns
 */

const getBySlug = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    const experience = await findExperienceBySlug(id);

    res.success(experience, 'Experience name successfully');
});

/**
 * update experience
 *
 * URI: /api/experience/:id
 *
 * @param {req} req
 * @param {res} res
 * @param {next} next
 * @returns
 */

const update = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    const { experience_name, title, sub_title } = req.body;

    const updateData = {
        experience_name,
        title,
        sub_title,
    };

    const result = await updateExperience(id, updateData);

    res.success(result, 'Experience update successfully');
});

/**
 * delete experience
 *
 * URI: /api/experience/:id
 *
 * @param {req} req
 * @param {res} res
 * @param {next} next
 * @returns
 */
const destroy = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    const result = await deleteExperience(id);
    if (!result.deletedCount) {
        throw new GeneralError("Could't delete the experience");
    }

    res.success(result, 'Experience delete successfully.');
});

module.exports = {
    index,
    store,
    destroy,
    update,
    getBySlug,
};
