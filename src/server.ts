import express from 'express'
import dotenv from 'dotenv'
import { conectDB } from './config/db'


dotenv.config()

conectDB()

const app = express()


export default app