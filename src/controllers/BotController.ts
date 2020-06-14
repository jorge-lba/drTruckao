import {Request, Response} from 'express'

import {twilioClient, TwilioMessagingResponse} from '../twilio/index'
import watsonSendMessage from '../watson/index'
import User from '../models/User'
import UserController from './UserController'

const tagsMessages = {
    dateOfBirth:'#data_de_nascimento',
    finalizeRegistration:'#fim_do_pre_cadastro',
    nonResponse:'#nao_quero_responsder',
    yesResponse:'#sim_quero_responder',
    doesMedicalMonitoring:'#faz_monitoramento_medico',
    whereMedicalMonitoring:'#onde_monitoramento_medico',
    weight:'#qual_o_seu_peso',
    height:'#qual_a_sual_altura',
    diabetes:'#voce_tem_diabetes',
    hypertension:'#voce_e_hipertenso',
    cholesterol:'#voce_tem_colesterol',
    receiveTips:'#quer_receber_dias',
    endQuestions:'#finalizar_questoes',
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
        nextAction:tagsMessages.doesMedicalMonitoring
    },
    {
        message:'Você faz acompanhamento médico?',
        type:'dateOfBirth',
        category:'registrationData',
        nextAction:tagsMessages.whereMedicalMonitoring
    },
    {
        message:'Onde você faz o acompanhamento?',
        type:'dateOfBirth',
        category:'registrationData',
        nextAction:tagsMessages.weight
    }, 
    {
        message:'Qual o seu peso atual?',
        type:'dateOfBirth',
        category:'registrationData',
        nextAction:tagsMessages.height
    },
    {
        message:'Qual sua altura?',
        type:'dateOfBirth',
        category:'registrationData',
        nextAction:tagsMessages.diabetes
    }, 
    {
        message:'Você já foi diagnosticado com diabetes?',
        type:'dateOfBirth',
        category:'registrationData',
        nextAction:tagsMessages.hypertension
    }, 
    {
        message:'Você já foi diagnosticado com pressão alta?',
        type:'dateOfBirth',
        category:'registrationData',
        nextAction:tagsMessages.cholesterol
    }, 
    {
        message:'Você já foi diagnosticado com colesterol alto?',
        type:'dateOfBirth',
        category:'registrationData',
        nextAction:tagsMessages.receiveTips
    },
    {
        message:'Você gostaria de receber dicas e sugestões de saúde e bem-estar?',
        type:'dateOfBirth',
        category:'registrationData',
        nextAction:tagsMessages.endQuestions
    }, 
]

const testLastMessage = (message:string, preMessages = botMessages) => {
   const msg = preMessages.find((botMessage:any) =>{
        return botMessage.message === message 
   })
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

                        
            if(user){
                const twilioMessages = await twilioClient.messages.list({from:'whatsapp:'+numberUser, limit:2})
                const watsonReponse:any = (await watsonSendMessage(messageUser))
                    ?.reduce((previous, current) => {
                        return String(previous + "\n" + current.text)
                    }, '')

                await twiml.message(watsonReponse)
            }else{
                const twilioMessages = await twilioClient.messages.list({to:'whatsapp:'+numberUser, limit:2})
                
                const messageFind = testLastMessage(twilioMessages[0].body.replace('\n',''))
                
                if(messageFind?.type){
                    const watsonReponse:any = (await watsonSendMessage(messageFind.nextAction))
                        ?.reduce((previous, current) => {
                            return String(previous + "\n" + current.text)
                        }, '')

                    await twiml.message(watsonReponse)
                }else{
                    const watsonReponse:any = (await watsonSendMessage('#bom_dia_novato'))
                        ?.reduce((previous, current) => {
                            return String(previous + "\n" + current.text)
                        }, '')

                    await twiml.message(watsonReponse)
                }

            }

            return response.status(200).writeHead(200, {'Content-Type': 'text/xml'}).end(twiml.toString())  
        } catch (error) {
            return response.status(400).writeHead(400, {'Content-Type': 'text/xml'}).end(twiml.toString())
        }

    }
}