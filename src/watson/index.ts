import AssistantV2 from 'ibm-watson/assistant/v2'
import { IamAuthenticator } from 'ibm-watson/auth'
import {config} from 'dotenv'

config()

const watson_apikey = String(process.env.ASSISTANT_APIKEY)
const watson_url = String(process.env.ASSISTANT_URL)
const watson_id = String(process.env.ASSISTANT_ID)


const assistant = new AssistantV2({
    version: '2020-06-13',
    authenticator: new IamAuthenticator({
      apikey: watson_apikey ,
    }),
    url: watson_url,
});

const watsonSendMessage = async (text?:string) => {
    const sessionId = (await assistant.createSession({assistantId:watson_id})).result
    console.log('>>>>>>>>>>' + sessionId.session_id)

    const message = (await assistant.message({
        assistantId: watson_id,
        sessionId:sessionId.session_id,
        input: {
            'message_type': 'text',
            text
            }
        }
    )).result

    return message.output.generic
}

export default watsonSendMessage
