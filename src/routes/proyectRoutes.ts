import {Router} from 'express'
import {body, param} from 'express-validator'
import { ProjectController } from '../controllers/ProjectController'
import { handleInputErrors } from '../middleware/validation'
import { TaskController } from '../controllers/TaskController'
import { validateProjectExist } from '../middleware/project'

const router = Router()


router.post('/',
    body('projectName')
        .notEmpty().withMessage('El Nombre del Proyecto es Obligatorio'),
    body('clientName')
        .notEmpty().withMessage('El Nombre del Cliente es Obligatorio'),
    body('description')
        .notEmpty().withMessage('La Descripcion del Proyecto es Obligatoria'),
    handleInputErrors,
    ProjectController.creeateProject)

router.get('/',ProjectController.getAllProyects)

router.get('/:id',
    param('id').isMongoId().withMessage('id no valido'),
    handleInputErrors,
    ProjectController.getProjectById)

router.put('/:id',
    param('id').isMongoId().withMessage('id no valido'),
    body('projectName')
        .notEmpty().withMessage('El Nombre del Proyecto es Obligatorio'),
    body('clientName')
        .notEmpty().withMessage('El Nombre del Cliente es Obligatorio'),
    body('description')
        .notEmpty().withMessage('La Descripcion del Proyecto es Obligatoria'),
    handleInputErrors,
    ProjectController.updateProject)

    router.delete('/:id',
    param('id').isMongoId().withMessage('id no valido'),
    handleInputErrors,
    ProjectController.deleteProject)


    


    /** Routes for tasks*/
    router.param('projectId', validateProjectExist)

    router.post('/:projectId/tasks',
        
        body('name')
        .notEmpty().withMessage('El Nombre de la tarea es Obligatorio'),
   
    body('description')
        .notEmpty().withMessage('La Descripcion de la tarea es Obligatoria'),
    handleInputErrors,
        TaskController.creeateTask)

        router.get('/:projectId/tasks',
            TaskController.getProjectTasks)


    router.get('/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage('id no valido'),
    handleInputErrors,
    TaskController.getTaskById)


    router.put('/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage('id no valido'),
      body('name')
        .notEmpty().withMessage('El Nombre de la tarea es Obligatorio'),
   
    body('description')
        .notEmpty().withMessage('La Descripcion de la tarea es Obligatoria'),

    handleInputErrors,
    TaskController.updateTask)

export default router