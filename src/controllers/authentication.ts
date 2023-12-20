import express from 'express'
import { getUsersByEmail, createUser } from '../db/users'
import { randomToken, authentication } from '../helpers/index'


export const login = async (req: express.Request, res: express.Response) => {
    try {
      const { email, password } = req.body

      if (!email || !password) {
        return res.sendStatus(400)
      }

      const user = await getUsersByEmail(email).select('+authentication.salt +authentication.password')

      if (!user) {
        return res.sendStatus(400)
      }

      const expectedHash = authentication(user.authentication.salt, password)

      if (user.authentication.password != expectedHash) {
        return res.sendStatus(403)
      }

      const salt = randomToken()
      user.authentication.access_token = authentication(salt, user._id.toString())

      await user.save()

      res.cookie('USER-AUTH', user.authentication.access_token, { domain: 'localhost', path: '/'})

      return res.status(200).json(user).end();
    } catch (error) {
      console.log(error)
      return res.sendStatus(400)
    }
}

export const register = async (req: express.Request, res: express.Response) => {
    try {
      const { email, password, username } = req.body;
      if (!email || !password || !username) {
        return res.sendStatus(400);
      }
  
      const existingUser = await getUsersByEmail(email);
    
      if (existingUser) {
        return res.sendStatus(400);
      }
  
      const salt = randomToken();
      const user = await createUser({
        email,
        username,
        authentication: {
          salt,
          password: authentication(salt, password),
        },
      });
  
      return res.status(200).json(user).end();
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  }

