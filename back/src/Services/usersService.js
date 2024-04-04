const User = require("../models/User")
const Order = require('../models/Order')
const { createCredentials } = require("./credentialsService")
const Credentials = require("../models/Credentials")

module.exports = {
    getAllUsersService: async() => {
        const users = await User.find()
        return users
    },
    getUserByIdService: async(userId) => {
        try {
            const user = await User.findById(userId).populate('orders');
            if(!user) {
                throw new Error('Usuario no encontrado')
            } else {
                return user
            }
        } catch (error) {
            throw new Error(error.message);
        }
    },
    registerUserService: async({firstName, lastName, email, phoneNum, password}) => {
        const credentials = await createCredentials(password)
        const newUser = new User({firstName, lastName, email, phoneNum, credentials, userType: 'customer'})
        const savedUser = await newUser.save()
        return savedUser;
    },
    loginUserService: async ({ email, password }) => {
        try {
            const user = await User.findOne({ email }).populate('credentials');
            if (!user) {
                throw new Error('Usuario no encontrado');
            }
            const userPassword = user.credentials.password;
            if (password === userPassword) {
                const user = await User.findOne({ email }).populate('orders');
                return {
                    user,
                    login: true
                };
            } else {
                throw new Error('Contraseña incorrecta');
            }
        } catch (error) {
            throw new Error(error.message);
        }
    },
    changeEmailService: async(email, prevEmail, userId) => {
        try {
            const user = await User.findById(userId);
            if(!user){
                throw new Error('Usuario no encontrado')
            }
            if(user.email!== prevEmail){
                throw new Error('Los datos proporcionados no coinciden')
            } else {
                user.email = email;
                await user.save();
                return user;
            }
        } catch (error) {
            throw new Error(error.message);
        }
    },
    changePhoneNumService: async(phoneNum, prevPhoneNum, userId) => {
        try {
            const user = await User.findById(userId);
            if(!user){
                throw new Error('Usuario no encontrado')
            }
            if(user.phoneNum!== prevPhoneNum){
                throw new Error('Los datos proporcionados no coinciden')
            } else {
                user.phoneNum = phoneNum;
                await user.save();
                return user;
            }
        } catch (error) {
            throw new Error(error.message);
        }
    },
    changePasswordService: async(password, prevPassword, userId) => {
        try {
            const user = await User.findById(userId);
            if(!user){
                throw new Error('Usuario no encontrado')
            } else {
                const credentials = await Credentials.findById(user.credentials);
                if(!credentials){
                    throw new Error('Informacion incompleta');
                } else {
                    if(credentials.password !== prevPassword){
                        throw new Error('Los datos proporcionados no coinciden')
                    } else {
                        credentials.password = password;
                        await credentials.save();
                        const user = await User.findById(userId).populate('credentials');
                        return user
                    }
                }
            }
        } catch (error) {
            throw new Error(error.message);
        }
    },
}