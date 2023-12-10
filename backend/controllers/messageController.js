const messageModel = require('../model/messageModel')

const sendMsg = async (req, res, next) => {
    try {
        const { message, from, to } = req.body
        const data = await messageModel.create({
            message : { text : message },
            users : [from, to],
            sender : from 
        })
        if(data){
            res.json({ msg : 'Message added successfully' })
        }else{
            res.json({ msg : 'Failed to add message!!' })
        }



    } catch (error) {
        next(error)
    }
}

const getAllMessages = async (req, res, next) => {
    try {
        const { from , to } = req.body
        const messages = await messageModel.find({
            users : { $all : [from, to] }
        }).sort({ updatedAt : 1 })
        const projectMessages = messages.map((msg) => {
            return {
                fromSelf : msg.sender.toString() === from,
                message : msg.message.text, 
            }
        })
        res.json(projectMessages)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    sendMsg,
    getAllMessages
}