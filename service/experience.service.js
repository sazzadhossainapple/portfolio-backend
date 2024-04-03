const Experience = require('../model/experience.model');

// get all experience
const getAllExperience = async (filters, queries) => {
    const experience = await Experience.find(filters).sort({
        createdAt: -1,
        updatedAt: -1,
    });

    const totalExperience = await Experience.countDocuments(filters);
    const page = Math.ceil(totalExperience / queries.limit);
    return { totalExperience, page, experience };
};

const createExperience = async (project) => {
    const experience = await Experience.create(project);
    return experience;
};

const findExperienceBySlug = async (id) => {
    return await Experience.findOne({ _id: id });
};
const updateExperience = async (id, data) => {
    return await Experience.updateOne(
        { _id: id },
        { $set: data },
        {
            runValidators: true,
        }
    );
};

// delete by id
const deleteExperience = async (id) => {
    const result = await Experience.deleteOne({ _id: id });
    return result;
};

module.exports = {
    getAllExperience,
    createExperience,
    findExperienceBySlug,
    updateExperience,
    deleteExperience,
};
