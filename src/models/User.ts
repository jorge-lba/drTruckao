import {Schema, model} from 'mongoose'

const UserSchema = new Schema({
    registrationData:{
        nome: String,
        dateOfBirth: Date,
        phone:String,
        cellPhone:{type:String, requered:true, unique:true},
        genre:String,
        cpf:String,
        rg:String,
        SUSCode:String
    },
    HDsData:{
        diabetesMellitus:[{

        }],
        arterialHypertension:[{}],
        dyslipidemia:[{}],
        cardiovascularDiseases:[{}],
        respiratoryDiseases:[{}],
        besity:[{
            heigth:Number,
            weight:Number,
            IMC:Number
        }],
        hepaticInsufficiency:[{}],
        renalInsufficiency:[{}],
        lifeHabits:{
            smoking:[{}],
            alcoholConsumption:[{}],
            otherDrugs:[{}],
            physicalInactivity:[{}]
        },
        previousMedications:[{}],
        complaints:[{}],
        ducts:[{}],
        queries:[{}]

    }
})

const User = model('User', UserSchema)

export default User