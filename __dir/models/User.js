"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __importDefault(require("../database/index"));
var Schema = index_1.default.Schema, model = index_1.default.model;
var UserSchema = new Schema({
    registrationData: {
        name: String,
        dateOfBirth: Date,
        phone: String,
        cellPhone: { type: String, requered: true, unique: true },
        genre: String,
        cpf: String,
        rg: String,
        SUSCode: String
    },
    HDsData: {
        diabetesMellitus: [{}],
        arterialHypertension: [{}],
        dyslipidemia: [{}],
        cardiovascularDiseases: [{}],
        respiratoryDiseases: [{}],
        besity: [{
                heigth: Number,
                weight: Number,
                IMC: Number
            }],
        hepaticInsufficiency: [{}],
        renalInsufficiency: [{}],
        lifeHabits: {
            smoking: [{}],
            alcoholConsumption: [{}],
            otherDrugs: [{}],
            physicalInactivity: [{}]
        },
        previousMedications: [{}],
        complaints: [{}],
        ducts: [{}],
        queries: [{}]
    }
});
var User = model('User', UserSchema);
exports.default = User;
