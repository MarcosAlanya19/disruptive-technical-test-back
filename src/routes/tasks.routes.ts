import { Router } from 'express';
import { tasksController } from '../controllers/TasksController';
import { authRequired } from '../middlewares/validateToken.mdw';

const router = Router();

router.get('/tasks', authRequired, tasksController.getTasks);
router.get('/tasks/:uuid', authRequired, tasksController.getTask);
router.post('/tasks', authRequired, tasksController.createTask);
router.delete('/tasks/:uuid', authRequired, tasksController.deleteTask);
router.put('/tasks/:uuid', authRequired, tasksController.updateTask);

export default router;
