const userController = require('./user.controller');
const projectCategoryCotroller = require('./projectCategory.controller');
const projectNameCotroller = require('./projectName.controller');

const controllers = {
    userController: userController,
    projectCategoryCotroller: projectCategoryCotroller,
    projectNameCotroller: projectNameCotroller,
};

module.exports = controllers;
