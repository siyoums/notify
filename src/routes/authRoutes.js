const express = require("express");
const { signupPost, signinPost } = require("../controllers/authControllers");

const router = express.Router();

router.post("/signup", signupPost);
router.post("/signin", signinPost);

module.exports = router;
