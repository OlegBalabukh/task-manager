const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Task = require('../../models/Task');

// @route     GET api/tasks
// @desc      Get current user tasks
// @access    Private
router.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.find().sort({ date: -1 });

    if (!tasks.length) {
      return res.status(400).json({ msg: 'There are no tasks for this user' });
    }

    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
