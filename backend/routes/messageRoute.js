const { sendMsg, getAllMessages } = require('../controllers/messageController')
const express = require('express')
const messageRoute = express.Router()

messageRoute.post('/sendMsg', sendMsg)
messageRoute.post('/getAllMessages', getAllMessages)

module.exports = {
    messageRoute
}