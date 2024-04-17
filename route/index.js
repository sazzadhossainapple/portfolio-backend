const express = require('express');
const router = express.Router();

const userRoute = require('./user.route');
const projectCategoryRoute = require('./projectCategory.route');
const projectNameRoute = require('./projectName.route');
const resumeRoute = require('./resume.route');
const experienceRoute = require('./experience.route');
const experienceProfileRoute = require('./experienceProfile.route');
const achievementsCertificationsRoute = require('./achievementsCertifications.route');

const routes = [
    { path: '/users', handler: userRoute },
    { path: '/project-category', handler: projectCategoryRoute },
    { path: '/project-name', handler: projectNameRoute },
    { path: '/resume', handler: resumeRoute },
    { path: '/experience', handler: experienceRoute },
    { path: '/experience-profile', handler: experienceProfileRoute },
    { path: '/acehivement', handler: achievementsCertificationsRoute },
];

routes.map((route) => router.use(route?.path, route?.handler));

const configureRoutes = (app) => app.use('/api', router);

module.exports = configureRoutes;
