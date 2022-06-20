const Router = require('express').Router;
const router = new Router();

const { body } = require('express-validator');
const AuthMiddleware = require('../middlewares/auth-middleware');

const UserController = require('../controllers/user-controller');


router.post("/signup",
	body('email').isEmail(),
	body('password').isLength({ min: 3, max: 32 }),
	UserController.Signup);
router.post("/login", UserController.Login);
router.post("/logout", UserController.Logout);

router.get("/activate/:link", UserController.Activate);
router.get("/refresh", UserController.Refresh);
router.get("/users", AuthMiddleware, UserController.GetAllUsers);

module.exports = router;