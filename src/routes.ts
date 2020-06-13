import express from 'express'
import {webhook} from 'twilio'

import BotController from './controllers/BotController'
import UserController from './controllers/UserController'

const routes = express.Router()
const res = webhook({validate:false})

routes.post('/twilio', res, BotController.response )

routes.post('/users', UserController.create)


export default routes