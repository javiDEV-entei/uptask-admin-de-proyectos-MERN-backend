import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import { corsConfig } from './config/cors'
import { conectDB } from './config/db'
import projectRoutes from './routes/proyectRoutes'


dotenv.config()

conectDB()

const app = express()
app.use(cors(corsConfig))

//Logging
app.use(morgan('dev'))

//leer datos delos formularios
app.use(express.json())

//Routes
app.use('/api/projects', projectRoutes)


export default app