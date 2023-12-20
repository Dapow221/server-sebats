import express from 'express'
import { register, login } from '../controllers/authentication'
import { getAllUsers, deleteUser, updateUsers, getUserDetail } from '../controllers/users'

export default (router: express.Router) => {
    router.post('/users/login', login)
    router.post('/users/register', register)
    router.get('/users', getAllUsers)
    router.delete('/users/:id', deleteUser)
    router.put('/users/update/:id', updateUsers)
    router.get('/users/:id', getUserDetail)
}