const { Router } = require('express');
const { verify } = require('../middleware/verify');
const { handleRefreshToken } = require('../controllers/refreshTokenController');
const { handleLogout } = require('../controllers/logoutController')

const { getUsers, 
        createUsers, 
        updateUsers, 
        deleteUsers,
        userLogin,
    } = require('../controllers/userController');

const router = Router();

//Routes
router.post('/login', userLogin);
router.post('/logout', handleLogout);
router.get('/refresh', handleRefreshToken);
router.get('/users', getUsers);
router.post('/register', verify, createUsers);
router.put('/update/:id', verify, updateUsers);
router.delete('/delete/:id', verify, deleteUsers);

module.exports = router;