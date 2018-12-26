/*
    Users calls
 */
const mongoose = require("mongoose");
const passport = require("passport");
const router = require("express").Router();

const auth = require("../auth");
const Users = mongoose.model("Users");

// POST new user route
router.post("/", auth.optional, async (req, res, next) => {
  const {
    body: { user }
  } = req;

  if (!user.email) {
    return res.status(422).json({
      errors: {
        email: "is required"
      }
    });
  }

  if (!user.password) {
    return res.status(422).json({
      errors: {
        password: "is required"
      }
    });
  }

  // Check if user already exist
  const existingUser = await Users.findOne({ email: user.email });
  if (existingUser) {
    return res.status(201).json({ user: existingUser.toAuthJSON() });
  }

  const finalUser = new Users(user);

  finalUser.setPassword(user.password);

  const savedUser = await finalUser.save();
  return res.status(201).json({ user: savedUser.toAuthJSON() });
});

// POST login route
router.post("/login", auth.optional, (req, res, next) => {
  const {
    body: { user }
  } = req;

  if (!user.email) {
    return res.status(422).json({
      errors: {
        email: "is required"
      }
    });
  }

  if (!user.password) {
    return res.status(422).json({
      errors: {
        password: "is required"
      }
    });
  }

  return passport.authenticate(
    "local",
    { session: false },
    (err, passportUser, info) => {
      if (err) {
        return next(err);
      }

      if (passportUser) {
        const user = passportUser;
        user.token = passportUser.generateJWT();

        return res.json({ user: user.toAuthJSON() });
      }

      return res.status(400).json(info);
    }
  )(req, res, next);
});

// GET current user
router.get("/current", auth.required, async (req, res, next) => {
  const {
    payload: { id }
  } = req;

  const user = await Users.findById(id);

  if (!user) {
    return res.sendStatus(400);
  }

  return res.json({ user: user.toAuthJSON() });
});

module.exports = router;
