import mongoose from 'mongoose'

mongoose.Promise = global.Promise

mongoose.connect( String(process.env.URL_DATABASE), {
    useNewUrlParser: true, 
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false 
} )

module.exports = mongoose