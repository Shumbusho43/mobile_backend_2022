const express = require('express');
const Router = express.Router();
const {
    registerUser,
    login,
} = require('../../controllers/user/user.controller');
Router.post('/register', registerUser);
Router.post('/login', login);
module.exports.userRouter = Router;