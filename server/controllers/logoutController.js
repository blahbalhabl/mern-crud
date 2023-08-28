const UserModel = require('../models/userModel');

const handleLogout = async (req, res) => {
    // On Client also delete the accessToken**RMEMEBER***

    const refreshToken = req.cookies.jwt
    if(!refreshToken) return res.sendStatus(204); //No content

    const foundUser = await UserModel.findOne({ refreshToken })
    if(!foundUser){ 
        res.clearCookie('jwt', { httpOnly: true });
        return res.sendStatus(204);
    }
    
    // Delete the Refresh Token in DB
    foundUser.refreshToken = undefined; // Remove the refresh token from the user document
    await foundUser.save();

    res.clearCookie('jwt', { httpOnly: true });
    res.sendStatus(204); // No content
};

module.exports = { handleLogout };