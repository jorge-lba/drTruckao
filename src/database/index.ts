import mongoose from 'mongoose'
import {config} from 'dotenv'

config()

mongoose.Promise = global.Promise

mongoose.connect( String(process.env.URL_DATABASE), {
    useNewUrlParser: true, 
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false 
} )

export default mongoose