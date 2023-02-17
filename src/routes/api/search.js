const { Router } = require('express');
const { searchTopics } = require('../../controllers/searchControllers');

const router = Router();

// search user by name
router.post('/search', searchTopics);

module.exports = router;
