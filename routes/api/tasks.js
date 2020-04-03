const express = require('express');
const router = express.Router();

// @route     GET api/tasks
// @desc      Test route
// @access    Public
router.get('/', (req, res) => res.send('Task route'));

module.exports = router;
