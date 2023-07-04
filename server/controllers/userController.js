const UserModel = require('../models/userModel');

const getUsers = async (req, res) => {
    const users = await UserModel.find().lean().exec();
    res.send(users);
};

const createUsers = (req, res) => {
    const { email, name, password, role } = req.body

    UserModel.create({ email, name, password, role })
    .then((data) => {
        console.log('User Saved Successfully...');
        res.status(201).send(data);
    }).catch((err) => {
        console.log(err);
        res.send({error: err, msg: 'Something went wrong!'})
    });
};

const updateUsers = (req, res) => {
    const { id } = req.params
    const { email, name, password, role } = req.body

    UserModel.findByIdAndUpdate(id, { email, name, password, role })
    .then(() => res.send('Updated Successfully...'))
    .catch((err) => {
        console.log(err);
        res.send({error: err, msg: 'Something went wrong!'})
    });
};

const deleteUsers = (req, res) => {
    const { id } = req.params

    UserModel.findByIdAndDelete(id)
    .then(() => res.send('Deleted Successfully...'))
    .catch((err) => {
        console.log(err);
        res.send({error: err, msg: 'Something went wrong!'})
    });
};

module.exports = {
    getUsers,
    createUsers,
    updateUsers,
    deleteUsers
}
