const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
router.use(bodyParser());

// middleware
const { authAccessToken } = require('../middleware/authAccessToken');

//users
const { signIn } = require('../controllers/users/signIn');
const { signUp } = require('../controllers/users/signup');

const { quizCreate } = require('../controllers/quizzes/quizCreate');

router.post('/users/signup', signUp)
router.post('/users/signin', signIn);

router.post('/quizzes/create', authAccessToken, quizCreate)

module.exports = router;

