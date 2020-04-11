const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');
const Task = require('../../models/Task');

// @route     POST api/users
// @desc      Register user
// @access    Public
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // See is user exists
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      user = new User({
        name,
        email,
        password,
      });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // Return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route     DELETE api/users
// @desc      Delete user and its tasks
// @access    Private
router.delete('/', auth, async (req, res) => {
  try {
    // Remove user
    await User.findOneAndRemove({ _id: req.user.id });
    // Remove user's tasks
    await Task.deleteMany({ user: req.user.id });

    // Remove user from 'access' array in shared tasks
    const sharedTasks = await Task.find({ 'access.user': req.user.id });

    sharedTasks.forEach(async (task) => {
      const updatedAccessArray = task.access.filter(
        ({ user }) => user.toString() !== req.user.id
      );
      // Update
      await Task.findOneAndUpdate(
        { _id: task._id },
        { $set: { access: updatedAccessArray } },
        { new: true }
      );
    });

    res.json({ msg: 'Deleted user and his tasks' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
