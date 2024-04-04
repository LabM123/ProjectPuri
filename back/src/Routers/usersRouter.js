const express = require('express')
const { getAllUsers, getUserById, registerUser, loginUser, changePhoneNum, changeEmail, changePassword } = require('../Controllers/usersControllers')
const usersRouter = express.Router()

usersRouter.get('/', getAllUsers)
usersRouter.get('/:id', getUserById)
usersRouter.post('/register', registerUser)
usersRouter.post('/login', loginUser)
usersRouter.put('/email', changeEmail) 
usersRouter.put('/phoneNum', changePhoneNum)
usersRouter.put('/password', changePassword)

module.exports = {usersRouter}