import express from "express"

import { getUsers, getUsersById, deleteUserById  } from "../db/users"

export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
        const user = await getUsers()

        return res.status(200).json(user)
    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}

export const getUserDetail = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params
        const userDetail = await getUsersById(id)

        return res.status(200).json(userDetail)
    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}

export const updateUsers = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params
        const { username } = req.body

        if (!username) {
            return res.sendStatus(403)
        }

        const updatedUser = await getUsersById(id)

        updatedUser.username = username
        await updatedUser.save()

        return res.status(200).json(updatedUser).end()
    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}

export const deleteUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params
        const deletedUser = await deleteUserById(id);

        return res.json(deletedUser);
    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}