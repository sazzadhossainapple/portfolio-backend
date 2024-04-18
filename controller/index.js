const userController = require('./user.controller');
const projectCategoryCotroller = require('./projectCategory.controller');
const projectNameCotroller = require('./projectName.controller');
const resumeCotroller = require('./resume.controller');
const experienceCotroller = require('./experience.controller');
const experienceProfileCotroller = require('./experienceProfile.controller');
const achievementsCertificationsCotroller = require('./achievementsCertifications.controller');
const aboutMeCotroller = require('./aboutMe.controller');
const blogCotroller = require('./blog.controller');

const controllers = {
    userController: userController,
    projectCategoryCotroller: projectCategoryCotroller,
    projectNameCotroller: projectNameCotroller,
    resumeCotroller: resumeCotroller,
    experienceCotroller: experienceCotroller,
    experienceProfileCotroller: experienceProfileCotroller,
    achievementsCertificationsCotroller: achievementsCertificationsCotroller,
    aboutMeCotroller: aboutMeCotroller,
    blogCotroller: blogCotroller,
};

module.exports = controllers;
