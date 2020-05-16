const moduleName = "Users.js";

const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require(path.join(__base, "config/config"));

// User Model
const User = require(path.join(__base, "models/User"));

// PostUsers
const postUsers = (req, res) => {
  const { name, email, password } = req.body;

  // Validation
  if (!name || !email || !password) {
    config.err_400.data.message = "Please enter all fields";
    return res.status(400).json(config.err_400);
  }

  // Check for existing user
  User.findOne({ email }).then((user) => {
    config.err_400.data.message = "User already exists";
    if (user) return res.status(400).json(config.err_400);

    const newUser = new User({
      name,
      email,
      password
    });

    // Create salt & hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then((user) => {
          jwt.sign(
            // Payload, secret, expiration, callback
            { id: user.id },
            config.JWTSecret,
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email
                }
              });
            }
          );
        });
      });
    });
  });
};
exports.postUsers = postUsers;
