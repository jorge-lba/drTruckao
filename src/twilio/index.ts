import twilio from 'twilio'
import dotenv from 'dotenv'

dotenv.config()

const accountSid = String(process.env.TWILIO_ACCOUNT_SID)
const authToken = String(process.env.TWILIO_AUTH_TOKEN)

const twilioClient = twilio(accountSid, authToken)
const TwilioMessagingResponse = twilio.twiml.MessagingResponse

export { twilioClient, TwilioMessagingResponse }
