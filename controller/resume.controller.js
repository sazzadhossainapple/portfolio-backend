const asyncWrapper = require('../middleware/asyncWrapper');
const {
    getAllResume,
    createResume,
    findResumeBySlug,
    updateResume,
    deleteResume,
} = require('../service/resume.service');

/**
 * get all resume
 *
 * URI: /api/resume
 *
 * @param {req} req
 * @param {res} res
 * @param {next} next
 * @returns
 */
const index = asyncWrapper(async (req, res, next) => {
    const resume = await getAllResume();
    res.success(resume, 'Resume successfully');
});

/**
 * create Resume
 *
 * URI: /api/resume
 *
 * @param {req} req
 * @param {res} res
 * @param {next} next
 * @returns
 */

const store = asyncWrapper(async (req, res, next) => {
    const { link } = req.body;

    const newData = {
        link,
    };

    const resume = await createResume(newData);

    res.success(resume, 'Resume create succssfully');
});

/**
 * get by resume id
 *
 * URI: /api/resume/:id
 *
 * @param {req} req
 * @param {res} res
 * @param {next} next
 * @returns
 */

const getById = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    const resume = await findResumeBySlug(id);

    res.success(resume, 'Resume successfully');
});

/**
 * update resume
 *
 * URI: /api/resume/:id
 *
 * @param {req} req
 * @param {res} res
 * @param {next} next
 * @returns
 */

const update = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    const { link } = req.body;

    const updateData = { link };

    const result = await updateResume(id, updateData);

    res.success(result, 'Resume update successfully');
});

/**
 * delete resume
 *
 * URI: /api/resume/:id
 *
 * @param {req} req
 * @param {res} res
 * @param {next} next
 * @returns
 */
const destroy = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    const result = await deleteResume(id);
    if (!result.deletedCount) {
        throw new GeneralError("Could't delete the resume");
    }

    res.success(result, 'Resume delete successfully.');
});

module.exports = {
    index,
    store,
    destroy,
    update,
    getById,
};
