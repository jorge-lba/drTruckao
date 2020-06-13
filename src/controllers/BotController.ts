import {Request, Response} from 'express'

import {twilioClient, TwilioMessagingResponse} from '../twilio/index'
import watsonSendMessage from '../watson/index'

export default{
    async response(request:Request, response:Response){
        const numberUSer = request.body.To.replace('whatsapp:','')
        const messageUser = request.body.Body

        console.log(numberUSer, messageUser)               
        const twiml = new TwilioMessagingResponse()

        const watsonReponse:any = (await watsonSendMessage(messageUser))
            ?.reduce((previous, current) => {
                return String(previous + "\n" + current.text)
            }, '')
        
        console.log(watsonReponse)
        await twiml.message(watsonReponse)

        // response.writeHead();
        return response.status(200).writeHead(200, {'Content-Type': 'text/xml'}).end(twiml.toString())
    }
}