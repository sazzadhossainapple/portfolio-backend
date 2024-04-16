const ExperienceProfile = require('../model/experienceProfile.model');

// get all experienceProfile
const getAllExperienceProfile = async (filters, queries) => {
    const experienceProfile = await ExperienceProfile.find(filters).sort({
        createdAt: -1,
        updatedAt: -1,
    });

    const totalExperienceProfile = await ExperienceProfile.countDocuments(
        filters
    );
    const page = Math.ceil(totalExperienceProfile / queries.limit);
    return { totalExperienceProfile, page, experienceProfile };
};

const createExperienceProfile = async (project) => {
    const experienceProfile = await ExperienceProfile.create(project);
    return experienceProfile;
};

const findExperienceProfileBySlug = async (id) => {
    return await ExperienceProfile.findOne({ _id: id });
};
const updateExperienceProfile = async (id, data) => {
    return await ExperienceProfile.updateOne(
        { _id: id },
        { $set: data },
        {
            runValidators: true,
        }
    );
};

// delete by id
const deleteExperienceProfile = async (id) => {
    const result = await ExperienceProfile.deleteOne({ _id: id });
    return result;
};

module.exports = {
    getAllExperienceProfile,
    createExperienceProfile,
    findExperienceProfileBySlug,
    updateExperienceProfile,
    deleteExperienceProfile,
};
