import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import routes from './routes'
import path from 'path'

const app = express()

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(routes)
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')) )

export default app