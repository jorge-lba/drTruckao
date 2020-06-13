import {Request, Response} from 'express'

import User from '../models/User'

export default {
    async create(request:Request, response:Response){
        const type = request.body.type
        
        try {
            const cellPhone = request.body.From.replace('whatsapp:','')
    
            const userCreated = await User.create({
                registrationData:{
                    cellPhone
                }
            })
    
            if(type === 'api'){
                return response.status(200).json({
                    message:'Usuário criado com sucesso.',
                    user:userCreated
                })
            }else{
                return userCreated
            }  
        } catch (error) {
            if(type === 'api'){
                return response.status(200).json({
                    message:'Erro na criação do usuário.',
                    error
                })
            }else{
                return error
            }  
        }

    }
}
