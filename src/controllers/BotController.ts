import {Request, Response} from 'express'

import {twilioClient, TwilioMessagingResponse} from '../twilio/index'
import watsonSendMessage from '../watson/index'
import User from '../models/User'
import UserController from './UserController'

const tagsMessages = {
    dateOfBirth:'#data_de_nascimento',
    finalizeRegistration:'#fim_do_pre_cadastro',
    nonResponse:'#nao_quero_responsder',
    yesResponse:'#sim_quero_responder'
}

const botMessages = [
    {
        message:'Olá, eu sou o Dr. Truckão.Parece que não nos conhecemos ainda. Qual o seu nome?',
        type:'name',
        category:'registrationData',
        nextAction:tagsMessages.dateOfBirth
    },
    {
        message:'Prazer em te conhecer.Qual a sua data de nascimento?',
        type:'dateOfBirth',
        category:'registrationData',
        nextAction:tagsMessages.finalizeRegistration
    },
    {
        message:'Eu gostaria de fazer algumas pergunta sobre a sua saúde. Podemos iniciar?',
        type:'startQuestions',
        category:'continue',
        nextAction:''
    }   
]

const testLastMessage = (message:string, preMessages = botMessages) => {
   const msg = preMessages.find((botMessage:any) => botMessage.message === message )
   console.log(msg)
   return msg
} 

export default{
    async response(request:Request, response:Response){
        const twiml = new TwilioMessagingResponse()
        try {
            const numberUser = request.body.From.replace('whatsapp:','')
            const messageUser = request.body.Body
    
            const user:any = await User.findOne({registrationData:{cellPhone:numberUser}})     

            console.log(numberUser, messageUser)   
            
            if(user.registrationData.dateOfBirth){
                const twilioMessages = await twilioClient.messages.list({from:'whatsapp:'+numberUser, limit:2})
                const watsonReponse:any = (await watsonSendMessage(messageUser))
                    ?.reduce((previous, current) => {
                        return String(previous + "\n" + current.text)
                    }, '')
            
                console.log(watsonReponse)
                await twiml.message(watsonReponse)
                console.log(twilioMessages)
            }else{
                const twilioMessages = await twilioClient.messages.list({to:'whatsapp:'+numberUser, limit:2})
                
                const messageFind = testLastMessage(twilioMessages[0].body.replace('\n',''))
                console.log(messageFind)
                console.log(twilioMessages)
                
                if(messageFind?.type){
                    const watsonReponse:any = (await watsonSendMessage(messageFind.nextAction))
                        ?.reduce((previous, current) => {
                            return String(previous + "\n" + current.text)
                        }, '')
                    console.log(watsonReponse)
                    await twiml.message(watsonReponse)
                }else{
                    const watsonReponse:any = (await watsonSendMessage('#bom_dia_novato'))
                        ?.reduce((previous, current) => {
                            return String(previous + "\n" + current.text)
                        }, '')
                    console.log(watsonReponse)
                    await twiml.message(watsonReponse)
                }

            
                console.log('Não cadastrado')
            }

            return response.status(200).writeHead(200, {'Content-Type': 'text/xml'}).end(twiml.toString())  
        } catch (error) {
            return response.status(400).writeHead(400, {'Content-Type': 'text/xml'}).end(twiml.toString())
        }

    }
}