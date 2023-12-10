const userSchema = require('../model/usersModel')
const bcrypt = require('bcrypt')

const registerController = async(req, res) => {
    const { userName, email, password } = req.body

    try {
        // check if the username and email is already used or not
        const userNameCheck = await userSchema.findOne({ userName })
        const emailCheck = await userSchema.findOne({ email })

        if(userNameCheck){
            return res.json({msg : 'UserName is already used !', status : false})
        }else if(emailCheck){
            return res.json({msg : 'Email is already used !', status : false})
        }

        // Hashing the password
        const hashPassword = await bcrypt.hash(password, 10)
        const newUser = await userSchema.create({
            userName, 
            email,
            pasword : hashPassword
        })
        return res.json({ status : true, newUser})
    } catch (error) {
        res.json({ msg : error, status : false})
    }
}

const loginController = async(req, res, next) => {
    const { userName, password } = req.body
    try{
        const checkUserName = await userSchema.findOne({ userName })

        if(!checkUserName){
            return res.json({ msg : 'Incorrect username or password !', status : false})
        }
        const isPasswordValid = await bcrypt.compare(password, checkUserName.pasword)
        if(!isPasswordValid){
            return res.json({ msg : 'Incorrect username or password !', status : false})
        }
        return res.json({ status : true, checkUserName })
    }catch(error){
        next(error)
    }
}

const avatarController = async(req, res, next) => {
    try {
        const { id } = req.params
        const avatarImage = req.body.image 
        const userData = await userSchema.findByIdAndUpdate(id, {
            isAvatarImage: true,
            avatarImage
        })
        return res.json({
            isSet : userData.isAvatarImage,
            image : userData.avatarImage
        })
    } catch (error) {
        next(error)
    }
}

const getAllUsers = async (req, res, next) => {
    try {
        const users = await userSchema.find({ _id : {$ne:req.params.id}}).select([
            "email",
            "userName",
            "avatarImage",
            "_id"
        ])
        return res.json(users)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    registerController,
    loginController,
    avatarController,
    getAllUsers
}