const asyncWrapper = require('../middleware/asyncWrapper');
const {
    getAllProjectName,
    createProjectName,
    findProjectNameBySlug,
    updateProjectName,
    deleteProjectName,
} = require('../service/projectName.service');

/**
 * get all project name
 *
 * URI: /api/project-name
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

        /* Search on the  of office Category of branchName */
        // if (req.query.branchName) {
        //     queries.branchName = new RegExp(queries.branchName, 'i');
        // }

        if (req.query.page) {
            const { page = 1, limit = 6 } = req.query;
            const skip = (page - 1) * parseInt(limit);
            queries.skip = skip;
            queries.limit = parseInt(limit);
        }

        const PartnerBanks = await getAllProjectName(filters, queries);
        res.status(200).json({
            status: 'success',
            data: PartnerBanks,
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
 * create project name
 *
 * URI: /api/project-name
 *
 * @param {req} req
 * @param {res} res
 * @param {next} next
 * @returns
 */

const store = asyncWrapper(async (req, res, next) => {
    const {
        category_id,
        title,
        description,
        github_clinet,
        github_server,
        live_link,
        image,
    } = req.body;
    const slug = title.toLowerCase().replace(/\s+/g, '-');

    const projectName = await createProjectName({
        category_id,
        title,
        description,
        github_clinet,
        github_server,
        live_link,
        image,
        slug,
    });

    res.success(projectName, 'Project name create succssfully');
});

/**
 * get by project slug
 *
 * URI: /api/project-name/:slug
 *
 * @param {req} req
 * @param {res} res
 * @param {next} next
 * @returns
 */

const getBySlug = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    const project = await findProjectNameBySlug(id);

    res.success(project, 'Project name successfully');
});

/**
 * update project name
 *
 * URI: /api/project-name/:id
 *
 * @param {req} req
 * @param {res} res
 * @param {next} next
 * @returns
 */

const update = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    const {
        category_id,
        title,
        description,
        github_clinet,
        github_server,
        live_link,
        image,
        status,
    } = req.body;

    const slug = title.toLowerCase().replace(/\s+/g, '-');

    const updateData = {
        category_id,
        title,
        description,
        github_clinet,
        github_server,
        live_link,
        image,
        status,
        slug,
    };

    const result = await updateProjectName(id, updateData);

    res.success(result, 'Project update successfully');
});

/**
 * delete project category
 *
 * URI: /api/project-name/:id
 *
 * @param {req} req
 * @param {res} res
 * @param {next} next
 * @returns
 */
const destroy = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    const result = await deleteProjectName(id);
    if (!result.deletedCount) {
        throw new GeneralError("Could't delete the project name");
    }

    res.success(result, 'Project name delete successfully.');
});

module.exports = {
    index,
    store,
    destroy,
    update,
    getBySlug,
};
