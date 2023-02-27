const express = require('express');
const { signupPost, signinPost } = require('../../controllers/authControllers');
const { isLoggedIn } = require('../../controllers/post');
const { post } = require('../../controllers/post');
const { searchTopics, home } = require('../../controllers/searchControllers');
const { checkUser } = require('../../middleware/authMiddlare');

const router = express.Router();

router.get('/home', home);

//search
router.post('/search', searchTopics);

// auth router
router.post('/signup', signupPost);
router.post('/signin', signinPost);

// post
// router.use(isLoggedIn);
router.get('*', checkUser);
router.post('/upload', isLoggedIn, post);

module.exports = router;
