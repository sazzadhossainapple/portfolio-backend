const ProjectCategory = require('../model/projectCategory.model');

// get all project category
const getAllProject = async (query) => {
    const category = await ProjectCategory.find(query).sort({
        createdAt: -1,
        updatedAt: -1,
    });
    return category;
};

const createProject = async (project) => {
    const category = await ProjectCategory.create(project);
    return category;
};

const findProjectBySlug = async (id) => {
    return await ProjectCategory.findOne({ slug: id });
};
const updateCategory = async (id, data) => {
    return await ProjectCategory.updateOne(
        { _id: id },
        { $set: data },
        {
            runValidators: true,
        }
    );
};

// delete by id
const deleteCategory = async (id) => {
    const result = await ProjectCategory.deleteOne({ _id: id });
    return result;
};

module.exports = {
    getAllProject,
    createProject,
    findProjectBySlug,
    updateCategory,
    deleteCategory,
};
