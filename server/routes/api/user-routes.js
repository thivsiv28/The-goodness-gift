const router = require('express').Router();
const {
    createUser,
    getSingleUser,
    saveFundraiser,
    deleteFundraiser,
    login,
} =require('../../controllers/user-controller');

const { authMiddleware } = require('../../utils/auth');

router.route('/').post(createUser).put(authMiddleware, saveFundraiser);

router.route('/login').post(login);

router.route('/me').get(authMiddleware, getSingleUser);

router.route('/fundraiser/:fundraiserId').delete(authMiddleware, deleteFundraiser);

module.exports = router;
