const asyncWrapper = require('../middleware/asyncWrapper');
const {
    getAllProject,
    createProject,
    updateCategory,
    deleteCategory,
    findProjectBySlug,
} = require('../service/projectCategory.service');

/**
 * get all category
 *
 * URI: /api/project-category
 *
 * @param {req} req
 * @param {res} res
 * @param {next} next
 * @returns
 */
const index = asyncWrapper(async (req, res, next) => {
    const category = await getAllProject();
    res.success(category, 'Project category successfully');
});

/**
 * create project category
 *
 * URI: /api/project-category
 *
 * @param {req} req
 * @param {res} res
 * @param {next} next
 * @returns
 */

const store = asyncWrapper(async (req, res, next) => {
    const { title } = req.body;
    const slug = title.toLowerCase().replace(/\s+/g, '-');

    const category = await createProject({ title, slug });

    res.success(category, 'Project create succssfully');
});

/**
 * get by user email
 *
 * URI: /api/users/:email
 *
 * @param {req} req
 * @param {res} res
 * @param {next} next
 * @returns
 */

const getBySlug = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    const project = await findProjectBySlug(id);

    res.success(project, 'Project category successfully');
});

/**
 * update project
 *
 * URI: /api/project-category/:id
 *
 * @param {req} req
 * @param {res} res
 * @param {next} next
 * @returns
 */

const update = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    const { title, status } = req.body;
    const slug = title.toLowerCase().replace(/\s+/g, '-');

    const updateData = { title, status, slug };

    const result = await updateCategory(id, updateData);

    res.success(result, 'Project update successfully');
});

/**
 * delete project category
 *
 * URI: /api/project-category/:id
 *
 * @param {req} req
 * @param {res} res
 * @param {next} next
 * @returns
 */
const destroy = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    const result = await deleteCategory(id);
    if (!result.deletedCount) {
        throw new GeneralError("Could't delete the project category");
    }

    res.success(result, 'Project category delete successfully.');
});

module.exports = {
    index,
    store,
    destroy,
    update,
    getBySlug,
};
