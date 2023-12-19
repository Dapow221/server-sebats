import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    authentication: {
        password: { type: String, required: true, select: false },
        salt: { type: String, select: false },
        access_token: { type: String, select: false}
    }
})

export const userModel = mongoose.model('User', UserSchema)

export const getUsers = () => userModel.find()
export const getUsersByEmail = (email: String) => userModel.findOne({email})
export const getUsersById = (id: String) => userModel.findOne(id)
export const getUsersByAccessToken = (access_token: String) => userModel.findOne({
    'authentication.access_token' : access_token
})
export const createUser = (values: Record<string, any>) => new userModel(values).save().then((user) => user.toObject())
export const deleteUserById = (id: String) => userModel.findOneAndDelete(id)
export const updateUserById = (id: String, values: Record<string, any>) => userModel.findByIdAndUpdate(id, values)

