const express = require('express');
const { projectCategoryCotroller } = require('../controller');
const { auth } = require('../middleware');

const router = express.Router();

const { index, store, destroy, update, getBySlug } = projectCategoryCotroller;

// Register application routes here...

router.route('/').get(index).post(auth, store);

router.route('/:id').get(getBySlug).patch(auth, update).delete(auth, destroy);

module.exports = router;
