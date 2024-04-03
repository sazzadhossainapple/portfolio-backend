const userController = require('./user.controller');
const projectCategoryCotroller = require('./projectCategory.controller');
const projectNameCotroller = require('./projectName.controller');
const resumeCotroller = require('./resume.controller');
const experienceCotroller = require('./experience.controller');

const controllers = {
    userController: userController,
    projectCategoryCotroller: projectCategoryCotroller,
    projectNameCotroller: projectNameCotroller,
    resumeCotroller: resumeCotroller,
    experienceCotroller: experienceCotroller,
};

module.exports = controllers;
