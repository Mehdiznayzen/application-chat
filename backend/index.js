const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const { userRoutes } = require('./routes/usersRoutes')
const { messageRoute } = require('./routes/messageRoute')
const socket = require('socket.io')

// Initialize the application
const app = express()
dotenv.config()

// Middlewares
app.use(cors())
app.use(express.json())
app.use('/api/auth', userRoutes)
app.use('/api/messages', messageRoute)

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})

// Connect to mongodb
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser:true, useUnifiedTopology:true})
    .then(() => {
        server()
    })
    .catch((error) => console.log(error))

const io = socket(server, {
    cors : {
        origin: 'http://localhost:5173',
        credentials : true,
    }
});

global.onlineUsers = new Map()
io.on('connection', (socket) => {
    global.chatSocket = socket
    socket.on('add-user', (userId) => {
        global.onlineUsers.set(userId, socket.id)
    })
    socket.on('send-msg', (data) => {
        const sendUserSocket = global.onlineUsers.get(data.to)
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-recieve", data.message);
        }
    })
})