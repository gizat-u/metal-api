const Router = require('express').Router;
const UserController = require('../controllers/user-controller');
const { body } = require('express-validator');

const router = new Router();

router.post("/signup",
	body('email').isEmail(),
	body('password').isLength({ min: 3, max: 32 }),
	UserController.Signup);
router.post("/login", UserController.Login);
router.post("/logout", UserController.Logout);

router.get("/activate/:link", UserController.Activate);
router.get("/refresh", UserController.Refresh);
router.get("/users", UserController.GetAllUsers);

module.exports = router;