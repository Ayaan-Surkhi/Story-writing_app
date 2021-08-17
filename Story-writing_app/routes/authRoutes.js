const { Router } = require('express');
const { signupGet, loginGet, signupPost, loginPost, logoutGet } = require('../controllers/authController');
const authRouter = Router();

authRouter.get('/signup', signupGet);
authRouter.get('/login', loginGet);
authRouter.post('/signup', signupPost);
authRouter.post('/login', loginPost);
authRouter.get('/logout', logoutGet);

module.exports = authRouter;