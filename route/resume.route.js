const express = require('express');
const { resumeCotroller } = require('../controller');
const { auth } = require('../middleware');

const router = express.Router();

const { index, store, destroy, update, getById } = resumeCotroller;

// Resume routes here...

router.route('/').get(index).post(auth, store);

router.route('/:id').get(getById).patch(auth, update).delete(auth, destroy);

module.exports = router;
