const express = require('express');
const { userController } = require('../controller');
const { auth } = require('../middleware');

const router = express.Router();

const {
    index,
    store,
    login,
    getMe,
    isAdmin,
    getByEmamil,
    getUserRole,
    destroy,
    update,
    updatePassword,
} = userController;

// Register application routes here...

router.route('/').get(auth, index).post(store);
router.post('/login', login);
router.route('/update-password').post(auth, updatePassword);

router.get('/me', auth, getMe);
router.get('/admin', auth, isAdmin);
router.get('/role', auth, getUserRole);

router
    .route('/:email')
    .get(auth, getByEmamil)
    // .get(auth, getUserRole)
    .put(auth, update)
    .delete(auth, destroy);

module.exports = router;
