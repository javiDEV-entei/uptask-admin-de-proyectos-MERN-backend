import {Router} from 'express'
import {body} from 'express-validator'
import { ProjectController } from '../controllers/ProjectController'
import { handleInputErrors } from '../middleware/validation'

const router = Router()


router.post('/',
    body('projectName')
        .notEmpty().withMessage('El Nombre del Proyrcto es Obligatorio'),
    body('clientName')
        .notEmpty().withMessage('El Nombre del Cliente es Obligatorio'),
    body('description')
        .notEmpty().withMessage('La Descripcion del Proyrcto es Obligatoria'),
    handleInputErrors,
    ProjectController.creeateProyect)

router.get('/',ProjectController.getAllProyects)

export default router