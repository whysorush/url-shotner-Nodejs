const express = require('express');

const router = express.Router();
const { handleGenrateShortUrl, handleGetAnalytics} = require('../controller/url')
// const { check, validationResult } = require('express-validator');


router.post('/',handleGenrateShortUrl);
router.get('/analytics/:shortId',handleGetAnalytics);

module.exports = router;  //exporting the router to use in app.js file.  //
