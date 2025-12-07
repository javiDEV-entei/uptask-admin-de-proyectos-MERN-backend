import {Router} from 'express'
import {body, param} from 'express-validator'
import { ProjectController } from '../controllers/ProjectController'
import { handleInputErrors } from '../middleware/validation'
import { TaskController } from '../controllers/TaskController'
import { projectExist } from '../middleware/project'
import { hasAuthorization, taskBelongsToProject, taskExist } from '../middleware/task'
import { authenticate } from '../middleware/auth'
import { TeamMemberController } from '../controllers/TeamController'

const router = Router()

router.use(authenticate)


router.post('/',
    
    body('projectName')
        .notEmpty().withMessage('El Nombre del Proyecto es Obligatorio'),
    body('clientName')
        .notEmpty().withMessage('El Nombre del Cliente es Obligatorio'),
    body('description')
        .notEmpty().withMessage('La Descripcion del Proyecto es Obligatoria'),
    handleInputErrors,
    ProjectController.creeateProject)

router.get('/', ProjectController.getAllProyects)

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
    router.param('projectId', projectExist)

    router.post('/:projectId/tasks',
        hasAuthorization,
        body('name')
        .notEmpty().withMessage('El Nombre de la tarea es Obligatorio'),
   
    body('description')
        .notEmpty().withMessage('La Descripcion de la tarea es Obligatoria'),
    handleInputErrors,
        TaskController.creeateTask)

        router.get('/:projectId/tasks',
            TaskController.getProjectTasks)

            router.param('taskId',taskExist)
            router.param('taskId',taskBelongsToProject)

    router.get('/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage('id no valido'),
    handleInputErrors,
    TaskController.getTaskById)


    router.put('/:projectId/tasks/:taskId',
        hasAuthorization,
    param('taskId').isMongoId().withMessage('id no valido'),
      body('name')
        .notEmpty().withMessage('El Nombre de la tarea es Obligatorio'),
    body('description')
        .notEmpty().withMessage('La Descripcion de la tarea es Obligatoria'),
    handleInputErrors,
    TaskController.updateTask)


    router.delete('/:projectId/tasks/:taskId',
        hasAuthorization,
    param('taskId').isMongoId().withMessage('id no valido'),
    handleInputErrors,
    TaskController.deleteTask)
    
    
    router.post('/:projectId/tasks/:taskId/status',
    param('taskId').isMongoId().withMessage('id no valido'),
    body('status').notEmpty().withMessage('El estado es obligatorio'),
    handleInputErrors,
    TaskController.updateStatus

    )

    /** Routes for teams */

    router.post('/:projectId/team/find',
        body('email')
        .isEmail().toLowerCase().withMessage('E-mail no valido'),
        handleInputErrors,
        TeamMemberController.findMemberByEmail
    )
    router.get('/:projectId/team',
        TeamMemberController.getProjectTeam
    )

    router.post('/:projectId/team',
        body('id')
            .isMongoId().withMessage('ID no valido'),
        handleInputErrors,
        TeamMemberController.addMemberById
    )
    router.delete('/:projectId/team/:userId',
        param('userId')
            .isMongoId().withMessage('ID no valido'),
        handleInputErrors,
        TeamMemberController.removeMemberById
    )

export default router