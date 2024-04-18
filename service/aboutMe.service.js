const AboutMe = require('../model/aboutMe.model');

// get all AboutMe
const getAllAboutMe = async (filters, queries) => {
    const aboutMe = await AboutMe.find(filters).sort({
        createdAt: -1,
        updatedAt: -1,
    });

    const totalAboutMe = await AboutMe.countDocuments(filters);
    const page = Math.ceil(totalAboutMe / queries.limit);
    return { totalAboutMe, page, aboutMe };
};

const createAboutMe = async (project) => {
    const aboutMe = await AboutMe.create(project);
    return aboutMe;
};

const findAboutMeBySlug = async (id) => {
    return await AboutMe.findOne({ _id: id });
};
const updateAboutMe = async (id, data) => {
    return await AboutMe.updateOne(
        { _id: id },
        { $set: data },
        {
            runValidators: true,
        }
    );
};

// delete by id
const deleteAboutMe = async (id) => {
    const result = await AboutMe.deleteOne({ _id: id });
    return result;
};

module.exports = {
    getAllAboutMe,
    createAboutMe,
    findAboutMeBySlug,
    updateAboutMe,
    deleteAboutMe,
};
