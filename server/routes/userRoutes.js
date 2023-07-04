const { Router } = require('express');

const { getUsers, 
        createUsers, 
        updateUsers, 
        deleteUsers 
    } = require('../controllers/userController');

const router = Router();

router.get('/users', getUsers);
router.post('/register', createUsers);
router.put('/update/:id', updateUsers);
router.delete('/delete/:id', deleteUsers);

module.exports = router;