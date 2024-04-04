const { registerUserService, loginUserService, getUserByIdService, getAllUsersService, changePhoneNumService, changeEmailService, changePasswordService } = require("../Services/usersService")

module.exports = {
    getAllUsers: async(req, res) => {
        try {
            const users = await getAllUsersService()
            res.status(200).json(users)
        } catch (error) {
            res.status(400).json({message: error.message})
        }
    },
    getUserById: async(req, res) => {
        try {
            const userId = req.params.id
            const user = await getUserByIdService(userId)
            res.status(200).json(user)
        } catch (error) {
            res.status(400).json({message: error.message})
        }
    },
    registerUser: async(req, res) => {
        try {
            const {firstName, lastName, email, phoneNum, username, password} = req.body
            if(!firstName||!lastName||!email||!password) throw Error('Error al crear usuario')
            const newUser = await registerUserService({firstName, lastName, email, phoneNum, username, password})
            res.status(200).json(newUser)
        } catch (error) {
            res.status(400).json({message: error.message})
        }
    },
    loginUser: async(req, res) => {
        try {
            const {email, password} = req.body
            if(!email || !password) throw Error('Informacion incompleta')
            const user = await loginUserService({email, password})
            res.status(200).json(user)
        } catch (error) {
            res.status(400).json({message: error.message})
        }
    },
    changeEmail: async(req, res) => {
        try {
            const {email, prevEmail, userId} = req.body;
            const user = await changeEmailService(email, prevEmail, userId);
            res.status(200).json(user)
        } catch (error) {
            res.status(400).json({message: error.message})
        }
    },
    changePhoneNum: async(req, res) => {
        try {
            const {phoneNum, prevPhoneNum, userId} = req.body
            const user = await changePhoneNumService(phoneNum, prevPhoneNum, userId);
            res.status(200).json(user)
        } catch (error) {
            res.status(400).json({message: error.message})
        }
    },
    changePassword: async(req, res) => {
        try {
            const {password, prevPassword, userId} = req.body
            const user = await changePasswordService(password, prevPassword, userId);
            res.status(200).json(user)
        } catch (error) {
            res.status(400).json({message: error.message})
        }
    }
}