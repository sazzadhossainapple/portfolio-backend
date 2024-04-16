const express = require('express');
const { experienceProfileCotroller } = require('../controller');
const { auth } = require('../middleware');

const router = express.Router();

const { index, store, destroy, update, getBySlug } = experienceProfileCotroller;

// Experience routes here...

router.route('/').get(index).post(auth, store);

router.route('/:id').get(getBySlug).patch(auth, update).delete(auth, destroy);

module.exports = router;