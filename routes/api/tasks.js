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

    const sharedTasks = await Task.find({ 'access.user': req.user.id }).select(
      `-access`
    );

    const shared = await Promise.all(
      sharedTasks.map(async ({ done, _id, user, name, description, date }) => {
        const whoShared = await User.findById(user);
        return {
          done,
          _id,
          name,
          description,
          date,
          sharedBy: whoShared.name,
        };
      })
    );

    if (!tasks.length && !sharedTasks.length) {
      return res.status(400).json({ msg: 'There are no tasks for this user' });
    }

    res.json(tasks.concat(shared));
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
      check('name', 'Name is required').not().isEmpty(),
      check('description', 'Description is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, description, done, sharedBy } = req.body;

    // Build task object
    const taskFields = {};
    if (!sharedBy) taskFields.user = req.user.id;
    if (name) taskFields.name = name;
    if (description) taskFields.description = description;
    if (typeof done === 'boolean') taskFields.done = done;

    try {
      let task = await Task.findById(req.params.id);

      if (task) {
        // Update
        task = await Task.findOneAndUpdate(
          { _id: req.params.id },
          { $set: taskFields },
          { new: true }
        );

        // Check which task is updated

        // User task
        if (task.user === req.user.id) {
          return res.json(task);
        }

        // Shared Task
        const { _id, name, description, done, date } = task;
        const sharedTask = { _id, name, description, done, sharedBy, date };
        return res.json(sharedTask);
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

// @route     POST api/tasks/share/:id
// @desc      Share task with another user
// @access    Private
router.post(
  '/share/:id',
  [auth, [check('email', 'Email is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let task = await Task.findById(req.params.id);

      const getAccessUser = await User.findOne({
        email: req.body.email,
      }).select('id, name');

      if (!getAccessUser) {
        return res.json({
          msg: 'This user is not registered in the system',
          type: 'error',
        });
      }

      // Build a shared user object
      const newShare = {
        user: getAccessUser.id,
      };

      // Check if task has already been shared to this user
      const alreadyShared =
        task.access.filter(
          ({ user }) => user.toString() === getAccessUser.id.toString()
        ).length > 0;

      if (alreadyShared) {
        return res.json({
          msg: 'This task was already shared with this user',
          type: 'error',
        });
      }

      task.access.unshift(newShare);

      await task.save();

      res.json({ msg: `Task successfully shared to ${getAccessUser.name}` });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route     DELETE api/tasks/:id
// @desc      Delete task
// @access    Private
router.delete('/:id', auth, async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);

    const tasks = await Task.find({ user: req.user.id }).sort({ date: -1 });

    const sharedTasks = await Task.find({ 'access.user': req.user.id }).select(
      `-access`
    );

    const shared = await Promise.all(
      sharedTasks.map(async ({ done, _id, user, name, description, date }) => {
        const whoShared = await User.findById(user);
        return {
          done,
          _id,
          name,
          description,
          date,
          sharedBy: whoShared.name,
        };
      })
    );

    res.json(tasks.concat(shared));
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
