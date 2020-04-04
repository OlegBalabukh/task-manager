const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Task = require('../../models/Task');
const User = require('../../models/User');

// @route     GET api/tasks
// @desc      Get logged user tasks
// @access    Private
router.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ date: -1 });

    if (!tasks.length) {
      return res.status(400).json({ msg: 'There are no tasks for this user' });
    }

    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// @route     POST api/tasks/:id?
// @desc      Create or update logged user task
// @access    Private
router.post(
  '/:id?',
  [
    auth,
    [
      check('name', 'Name is required')
        .not()
        .isEmpty(),
      check('description', 'Description is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, description } = req.body;

    // Build task object
    const taskFields = {};
    taskFields.user = req.user.id;
    if (name) taskFields.name = name;
    if (description) taskFields.description = description;

    try {
      let task = await Task.findById(req.params.id);

      if (task) {
        // Update
        task = await Task.findOneAndUpdate(
          { _id: req.params.id },
          { $set: taskFields },
          { new: true, useFindAndModify: false }
        );

        return res.json(task);
      }

      // Create
      task = new Task(taskFields);
      await task.save();

      res.json(task);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
