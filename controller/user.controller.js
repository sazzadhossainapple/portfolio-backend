const asyncWrapper = require('../middleware/asyncWrapper');
const bcrypt = require('bcryptjs');

const {
    getAllUsersServices,
    signupService,
    findUserByEmail,
    updateUserByEmail,
    deleteUserByIdService,
} = require('../service/user.service');
const { generateToken } = require('../utils/token');
const { GeneralError } = require('../utils/error');

/**
 * get all users
 *
 * URI: /api/users
 *
 * @param {req} req
 * @param {res} res
 * @param {next} next
 * @returns
 */
const index = asyncWrapper(async (req, res, next) => {
    const users = await getAllUsersServices({});
    res.success(users, 'Users successfully');
});

/**
 * create user
 *
 * URI: /api/users
 *
 * @param {req} req
 * @param {res} res
 * @param {next} next
 * @returns
 */

const store = asyncWrapper(async (req, res, next) => {
    const { name, email, password } = req.body;

    const oldUser = await findUserByEmail(email);

    if (oldUser) {
        throw new GeneralError('User Already Exists.');
    }
    const user = await signupService({ name, email, password });

    res.success(user, 'User create succssfully');
});

/**
 * update users
 *
 * URI: /api/users/:email
 *
 * @param {req} req
 * @param {res} res
 * @param {next} next
 * @returns
 */

const update = asyncWrapper(async (req, res, next) => {
    const { email } = req.params;
    const { status, name } = req.body;

    const updateData = { status, name };

    const result = await updateUserByEmail(email, updateData);

    res.success(result, 'User update successfully');
});

/**
 * update users
 *
 * URI: /api/users/:id
 *
 * @param {req} req
 * @param {res} res
 * @param {next} next
 * @returns
 */
const destroy = asyncWrapper(async (req, res, next) => {
    const { email } = req.params;
    const result = await deleteUserByIdService(email);
    if (!result.deletedCount) {
        throw new GeneralError("Could't delete the user");
    }

    res.success(result, 'User delete successfully.');
});

/**
 * user check admin
 *
 * URI: /api/users/admin
 *
 * @param {req} req
 * @param {res} res
 * @param {next} next
 * @returns
 */
const isAdmin = async (req, res) => {
    try {
        let { email } = req.user;
        const user = await findUserByEmail(email);

        res.status(200).json({
            status: 'success',
            message: 'Successfully',
            isAdmin: user?.role === 'admin',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'fail',
            error,
        });
    }
};

/**
 * user login
 *
 * URI: /api/users/login
 *
 * @param {req} req
 * @param {res} res
 * @param {next} next
 * @returns
 */

const login = asyncWrapper(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new GeneralError('Please provide your credentials');
    }

    const user = await findUserByEmail(email);

    if (!user) {
        throw new GeneralError('No user found. Please create an account');
    }

    const isPasswordValid = user.comparePassword(password, user?.password);

    if (!isPasswordValid) {
        throw new GeneralError('Password is not correct');
    }

    if (user.status != 'active') {
        throw new GeneralError('Your account is not active yet.');
    }

    const token = generateToken(user);

    const { password: pwd, ...others } = user.toObject();
    res.success({ user: others, token }, 'Successfully logged in');
});

/**
 * user login profile
 *
 * URI: /api/users/me
 *
 * @param {req} req
 * @param {res} res
 * @param {next} next
 * @returns
 */
const getMe = asyncWrapper(async (req, res, next) => {
    const user = await findUserByEmail(req.user?.email);
    res.success(user, 'User login successfully');
});

/**
 * get by user email
 *
 * URI: /api/users/:email
 *
 * @param {req} req
 * @param {res} res
 * @param {next} next
 * @returns
 */

const getByEmamil = asyncWrapper(async (req, res, next) => {
    const { email } = req.body;
    const user = await findUserByEmail(email);

    res.success(user, 'User successfully');
});

/**
 * get by user role
 *
 * URI: /api/users/:email
 *
 * @param {req} req
 * @param {res} res
 * @param {next} next
 * @returns
 */
const getUserRole = asyncWrapper(async (req, res) => {
    const { email } = req.user;
    const user = await findUserByEmail(email);

    res.success(user, 'User Role find successfully.');
});

/**
 * Update User Password
 *
 * URI: /api/users/update-password
 *
 * @param {req} req
 * @param {res} res
 * @param {next} next
 * @returns
 */
const updatePassword = asyncWrapper(async (req, res, next) => {
    const { email } = req.user;
    const { current_password, new_password } = req.body;

    const user = await findUserByEmail(email);
    const { password } = user;

    if (await bcrypt.compare(current_password, password)) {
        const encryptedPassword = await bcrypt.hash(new_password, 10);
        await user.updateOne({ password: encryptedPassword });
        res.success('Password Updated Successfully!!');
    } else {
        res.success('Sorry!! Credentials not matched!!');
    }
});

module.exports = {
    index,
    store,
    destroy,
    update,
    isAdmin,
    getUserRole,
    getByEmamil,
    login,
    getMe,
    updatePassword,
};
