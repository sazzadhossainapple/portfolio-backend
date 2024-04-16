const asyncWrapper = require('../middleware/asyncWrapper');
const {
    getAllExperienceProfile,
    createExperienceProfile,
    findExperienceProfileBySlug,
    updateExperienceProfile,
    deleteExperienceProfile,
} = require('../service/experienceProfile.service');

/**
 * get all experience profile
 *
 * URI: /api/experience-profile
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

        const experience = await getAllExperienceProfile(filters, queries);
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
 * create experience profile
 *
 * URI: /api/experience-profile
 *
 * @param {req} req
 * @param {res} res
 * @param {next} next
 * @returns
 */

const store = asyncWrapper(async (req, res, next) => {
    const { title, company_name, date_range, link } = req.body;

    const experience = await createExperienceProfile({
        title,
        company_name,
        date_range,
        link,
    });

    res.success(experience, 'Experience create succssfully');
});

/**
 * get by experience profile
 *
 * URI: /api/experience-profile/:id
 *
 * @param {req} req
 * @param {res} res
 * @param {next} next
 * @returns
 */

const getBySlug = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    const experience = await findExperienceProfileBySlug(id);

    res.success(experience, 'Experience name successfully');
});

/**
 * update experience profile
 *
 * URI: /api/experience-profile/:id
 *
 * @param {req} req
 * @param {res} res
 * @param {next} next
 * @returns
 */

const update = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    const { title, company_name, date_range, link } = req.body;

    const updateData = {
        title,
        company_name,
        date_range,
        link,
    };

    const result = await updateExperienceProfile(id, updateData);

    res.success(result, 'Experience update successfully');
});

/**
 * delete experience profile
 *
 * URI: /api/experience-profile/:id
 *
 * @param {req} req
 * @param {res} res
 * @param {next} next
 * @returns
 */
const destroy = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    const result = await deleteExperienceProfile(id);
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
