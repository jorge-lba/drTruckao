import {Request, Response} from 'express'

import User from '../models/User'

const UserController = {
    async create(request:Request, response:Response, type:string){
        try {
            const cellPhone = request.body.To.replace('whatsapp:','')
    
            const userCreated = await User.create({
                registrationData:{
                    cellPhone
                }
            })
    
            if(type === 'whatsapp'){
                return userCreated
            }else{
                return response.status(200).json({
                    message:'Usuário criado com sucesso.',
                    user:userCreated
                })
            }  
        } catch (error) {
            if(type === 'whatsapp'){
                return error
            }else{
                return response.status(200).json({
                    message:'Erro na criação do usuário.',
                    error
                })
            }  
        }

    }
}

export default UserController