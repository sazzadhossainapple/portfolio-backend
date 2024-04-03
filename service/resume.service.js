const Resume = require('../model/resume.model');

// get all  resume
const getAllResume = async (query) => {
    const resume = await Resume.find(query).sort({
        createdAt: -1,
        updatedAt: -1,
    });
    return resume;
};

const createResume = async (project) => {
    const resume = await Resume.create(project);
    return resume;
};

const findResumeBySlug = async (id) => {
    return await Resume.findOne({ _id: id });
};
const updateResume = async (id, data) => {
    return await Resume.updateOne(
        { _id: id },
        { $set: data },
        {
            runValidators: true,
        }
    );
};

// delete by id
const deleteResume = async (id) => {
    const result = await Resume.deleteOne({ _id: id });
    return result;
};

module.exports = {
    getAllResume,
    createResume,
    findResumeBySlug,
    updateResume,
    deleteResume,
};
