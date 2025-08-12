import {Router} from 'express'
import { ProjectController } from '../controllers/ProjectController'

const router = Router()


router.post('/',ProjectController.creeateProyect)
router.get('/',ProjectController.getAllProyects)

export default router