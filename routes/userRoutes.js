const express = require("express");

// import the user controller --- route handlers for the user routes
const userController = require('../controllers/userController');

const router = express.Router(); // creating a new router for users resource

router.route('/').get(userController.getAllUsers).post(userController.createUser);
router.route('/:id').get(userController.getUser).patch(userController.updateUser).delete(userController.deleteUser);

module.exports = router;