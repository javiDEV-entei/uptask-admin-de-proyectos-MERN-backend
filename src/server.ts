import express from 'express'
import dotenv from 'dotenv'
import { conectDB } from './config/db'
import projectRoutes from './routes/proyectRoutes'


dotenv.config()

conectDB()

const app = express()

app.use(express.json())

//Routes
app.use('/api/projects', projectRoutes)


export default app