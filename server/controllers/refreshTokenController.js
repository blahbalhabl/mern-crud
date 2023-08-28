require('dotenv').config();
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');

const handleRefreshToken = async (req, res) => {
    const refreshToken = req.cookies.jwt
    if(!refreshToken) return res.sendStatus(401);

    const foundUser = await UserModel.findOne({ refreshToken })
    if(!foundUser) return res.sendStatus(403);
    // Evaluate JWT

    jwt.verify(
        refreshToken, 
        process.env.REFRESH_SECRET_KEY,
        (err, payload) => {
            if (err || foundUser.role !== payload.role) return res.sendStatus(403);
            const accessToken = jwt.sign({
                role: payload.role},
                process.env.SECRET_KEY,
                { expiresIn: '30s' }
                );
            res.json({ accessToken })
        }
    );
};

module.exports = { handleRefreshToken };