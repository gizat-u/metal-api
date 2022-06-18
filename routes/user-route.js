const Router = require('express').Router;
const UserController = require('../controllers/user-controller');

const router = new Router();

router.post("/signup", UserController.Signup);
router.post("/login", UserController.Login);
router.post("/logout", UserController.Logout);

router.get("/activate/:link", UserController.Activate);
router.get("/refresh", UserController.Refresh);
router.get("/users", UserController.GetAllUsers);

module.exports = router;