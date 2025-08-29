import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { corsConfig } from './config/cors'
import { conectDB } from './config/db'
import projectRoutes from './routes/proyectRoutes'


dotenv.config()

conectDB()

const app = express()
app.use(cors(corsConfig))

app.use(express.json())

//Routes
app.use('/api/projects', projectRoutes)


export default app