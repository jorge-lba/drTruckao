import express from 'express'
import {webhook} from 'twilio'

import BotController from './controllers/BotController'

const routes = express.Router()
const res = webhook({validate:false})

routes.post('/twilio', res, BotController.response )


export default routes