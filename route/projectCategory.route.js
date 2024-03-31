const express = require('express');
const { projectCategoryCotroller } = require('../controller');
const { auth } = require('../middleware');

const router = express.Router();

const { index, indexStatus, store, destroy, update, getBySlug } =
    projectCategoryCotroller;

// Register application routes here...

router.route('/').get(index).post(auth, store);
router.route('/status').get(indexStatus);

router.route('/:id').get(getBySlug).patch(auth, update).delete(auth, destroy);

module.exports = router;
