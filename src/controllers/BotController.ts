import {Request, Response} from 'express'

import {twilioClient, TwilioMessagingResponse} from '../twilio/index'
import watsonSendMessage from '../watson/index'
import User from '../models/User'
import UserController from './UserController'



export default{
    async response(request:Request, response:Response){
        const twiml = new TwilioMessagingResponse()
        try {
            const numberUser = request.body.From.replace('whatsapp:','')
            const messageUser = request.body.Body
    
            const user = await User.findOne({registrationData:{cellPhone:numberUser}})     

            console.log(numberUser, messageUser)   
            
            if(user){
                const twilioMessages = await twilioClient.messages.list({from:numberUser})
                console.log(twilioMessages)
            }else{
                console.log('Não cadastrado')
            }
    
            const watsonReponse:any = (await watsonSendMessage(messageUser))
                ?.reduce((previous, current) => {
                    return String(previous + "\n" + current.text)
                }, '')
            
            console.log(watsonReponse)
            await twiml.message(watsonReponse)
    
            // response.writeHead();
            return response.status(200).writeHead(200, {'Content-Type': 'text/xml'}).end(twiml.toString())  
        } catch (error) {
            return response.status(400).writeHead(400, {'Content-Type': 'text/xml'}).end(twiml.toString())
        }

    }
}