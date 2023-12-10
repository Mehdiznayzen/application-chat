const express = require('express')
const userRoutes = express.Router()
const { registerController, loginController, avatarController, getAllUsers } = require('../controllers/userController')

userRoutes.post('/register', registerController)
userRoutes.post('/login', loginController)
userRoutes.post('/setAvatar/:id', avatarController)
userRoutes.get('/allUsers/:id', getAllUsers)

module.exports = {
    userRoutes
}