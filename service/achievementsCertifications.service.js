const AchievementsCertifications = require('../model/achievementsCertifications.model');

// get all AchievementsCertifications
const getAllAchievementsCertifications = async (filters, queries) => {
    const achievementsCertifications = await AchievementsCertifications.find(
        filters
    ).sort({
        createdAt: -1,
        updatedAt: -1,
    });

    const totalAchievementsCertifications =
        await AchievementsCertifications.countDocuments(filters);
    const page = Math.ceil(totalAchievementsCertifications / queries.limit);
    return {
        totalAchievementsCertifications,
        page,
        achievementsCertifications,
    };
};

const createAchievementsCertifications = async (project) => {
    const achievementsCertifications = await AchievementsCertifications.create(
        project
    );
    return achievementsCertifications;
};

const findAchievementsCertificationsBySlug = async (id) => {
    return await AchievementsCertifications.findOne({ _id: id });
};
const updateAchievementsCertifications = async (id, data) => {
    return await AchievementsCertifications.updateOne(
        { _id: id },
        { $set: data },
        {
            runValidators: true,
        }
    );
};

// delete by id
const deleteAchievementsCertifications = async (id) => {
    const result = await AchievementsCertifications.deleteOne({ _id: id });
    return result;
};

module.exports = {
    getAllAchievementsCertifications,
    createAchievementsCertifications,
    findAchievementsCertificationsBySlug,
    updateAchievementsCertifications,
    deleteAchievementsCertifications,
};
