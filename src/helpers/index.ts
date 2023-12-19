import crypto from 'crypto'

const SECRET_KEY = 'REST-API-SERVER'

export const randomToken = () => crypto.randomBytes(128).toString('base64')
export const authentication = (salt: String, password: String) => {
    return crypto.createHmac('sha256', [salt, password].join('/')).update(SECRET_KEY).digest('hex')
}