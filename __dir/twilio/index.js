"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwilioMessagingResponse = exports.twilioClient = void 0;
var twilio_1 = __importDefault(require("twilio"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var accountSid = String(process.env.TWILIO_ACCOUNT_SID);
var authToken = String(process.env.TWILIO_AUTH_TOKEN);
var twilioClient = twilio_1.default(accountSid, authToken);
exports.twilioClient = twilioClient;
var TwilioMessagingResponse = twilio_1.default.twiml.MessagingResponse;
exports.TwilioMessagingResponse = TwilioMessagingResponse;
