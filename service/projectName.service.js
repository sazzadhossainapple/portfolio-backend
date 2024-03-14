const ProjectName = require('../model/projectName.model');

// get all project category
const getAllProjectName = async (filters, queries) => {
    const category = await ProjectName.find(filters)
        .populate('category_id')
        .sort({
            createdAt: -1,
            updatedAt: -1,
        });

    const totalProjectName = await ProjectName.countDocuments(filters);
    const page = Math.ceil(totalProjectName / queries.limit);
    return { totalProjectName, page, category };
};

const createProjectName = async (project) => {
    const category = await ProjectName.create(project);
    return category;
};

const findProjectNameBySlug = async (id) => {
    return await ProjectName.findOne({ slug: id }).populate('category_id');
};
const updateProjectName = async (id, data) => {
    return await ProjectName.updateOne(
        { _id: id },
        { $set: data },
        {
            runValidators: true,
        }
    );
};

// delete by id
const deleteProjectName = async (id) => {
    const result = await ProjectName.deleteOne({ _id: id });
    return result;
};

module.exports = {
    getAllProjectName,
    createProjectName,
    findProjectNameBySlug,
    updateProjectName,
    deleteProjectName,
};
