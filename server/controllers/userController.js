require('dotenv').config();
const UserModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// JWT Implementation...

const generateAccessToken = (user) => {
  return jwt.sign({
    role: user.role}, 
    process.env.SECRET_KEY,
    { expiresIn: '30s' });
};

const generateRefreshToken = (user) => {
  return jwt.sign({
    role: user.role}, 
    process.env.REFRESH_SECRET_KEY,
    { expiresIn: '1d' }
    );
}

// User endpoints...

const getUsers = async (req, res) => {
    const users = await UserModel.find().lean().exec();
    res.status(201).json(users);
};

const createUsers = async (req, res) => {
    const { email, name, password, role } = req.body

    try {
      //Check if User Already exists
      const existingUser = await UserModel.findOne({ email })
      if(existingUser) {
        res.status(401).json({ error: 'User Already Exists!'})
        return
      }
      // Hash Password with Bcrypt
      const hashPass = await bcrypt.hash(password, 10);
      // Upload User Information to User Database
      await UserModel.create({ email, name, password: hashPass, role })
      .then((data) => {
        console.log('User Saved Successfully...');
        res.status(201).send(data);
      }).catch((err) => {
        console.log(err);
        res.send({error: err, msg: 'Something went wrong!'})
      });
    } catch {
      res.status(500).json({ error: 'Something went wrong!'})
    }
};

const updateUsers = async (req, res) => {
    const { id } = req.params
    const { email, name, password, role } = req.body

    await UserModel.findByIdAndUpdate(id, { email, name, password, role })
    .then(() => res.send('Updated Successfully...'))
    .catch((err) => {
        console.log(err);
        res.send({error: err, msg: 'Something went wrong!'})
    });
};

const deleteUsers = async (req, res) => {
    const { id } = req.params

    if( id === req.params.id ) {
      await UserModel.findByIdAndDelete(id)
      .then(() => res.status(200).json(`User ${id} Deleted Successfuly...`))
      .catch((err) => {
        console.log(err);
        res.send({error: err, msg: 'Something went wrong!'})
    });
    } else {
      res.status(403).json('You are not authorized to delete this user...')
    }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  // Validation
  if (!(email && password)) {
    res.status(401).json({ error: 'Both fields are required!' });
    return;
  }
  try {
    // Find the user by email in the MongoDB collection
    const user = await UserModel.findOne({ email });
    if (!user) {
      // User not found, return an error response
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }
    // Compare Password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      res.status(403).json('Invalid credentials');
      return;
    }
    // Generate Access Token and Refresh Token
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    // Save the refresh token to the user database
    user.refreshToken = refreshToken;
    await user.save();

    // Set the refresh token as a cookie
    res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    // Return the access token
    res.status(201).json({ accessToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// const userLogout = (req, res) => {
//   const refreshToken = req.body.token;
//   refreshTokens = refreshTokens.filter((token) => token !== refreshToken)
//   res.status(204).json('You Logged Out!');
// }

module.exports = {
    getUsers,
    createUsers,
    updateUsers,
    deleteUsers,
    userLogin,
    // userLogout
}
