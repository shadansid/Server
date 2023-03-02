// ==========================Express Basic=================================
const express = require('express');
const router = express.Router();

// ========================Users Controllers==============================
const HomeController = require('../Controllers/Home/HomeController');
const SearchQueryController = require('../Controllers/Home/SearchQueryController');


//============================= Routes=====================================
router.get('/',HomeController);
router.get('/searchquery/:query',SearchQueryController);









module.exports = router;