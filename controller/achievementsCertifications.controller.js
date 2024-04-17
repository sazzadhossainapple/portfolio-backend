const asyncWrapper = require('../middleware/asyncWrapper');
const {
    getAllAchievementsCertifications,
    createAchievementsCertifications,
    findAchievementsCertificationsBySlug,
    updateAchievementsCertifications,
    deleteAchievementsCertifications,
} = require('../service/achievementsCertifications.service');

/**
 * get all Achievements Certifications
 *
 * URI: /api/acehivement
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

        const experience = await getAllAchievementsCertifications(
            filters,
            queries
        );
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
 * create Achievements Certifications
 *
 * URI: /api/acehivement
 *
 * @param {req} req
 * @param {res} res
 * @param {next} next
 * @returns
 */

const store = asyncWrapper(async (req, res, next) => {
    const { title, company_name, date_range, link } = req.body;

    const experience = await createAchievementsCertifications({
        title,
        company_name,
        date_range,
        link,
    });

    res.success(experience, 'Achievements Certifications create succssfully');
});

/**
 * get by Achievements Certifications
 *
 * URI: /api/acehivement/:id
 *
 * @param {req} req
 * @param {res} res
 * @param {next} next
 * @returns
 */

const getBySlug = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    const experience = await findAchievementsCertificationsBySlug(id);

    res.success(experience, 'Achievements Certifications successfully');
});

/**
 * update Achievements Certifications
 *
 * URI: /api/acehivement/:id
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

    const result = await updateAchievementsCertifications(id, updateData);

    res.success(result, 'Achievements Certifications update successfully');
});

/**
 * delete Achievements Certifications
 *
 * URI: /api/acehivement/:id
 *
 * @param {req} req
 * @param {res} res
 * @param {next} next
 * @returns
 */
const destroy = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    const result = await deleteAchievementsCertifications(id);
    if (!result.deletedCount) {
        throw new GeneralError(
            "Could't delete the Achievements Certifications"
        );
    }

    res.success(result, 'Achievements Certifications delete successfully.');
});

module.exports = {
    index,
    store,
    destroy,
    update,
    getBySlug,
};
