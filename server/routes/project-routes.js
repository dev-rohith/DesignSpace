import {Router} from 'express';
import projectCtrl from '../controllers/project-controller.js';
import authMiddleWare from '../middleware/auth-middleware.js';

const router = Router();

router.use(authMiddleWare.protect)
router.use(authMiddleWare.authorize('designer'))

router.post('/', projectCtrl.createProject)
router.get('/pending', projectCtrl.getMyPendingProjects)

router.route('/:project_id').get(projectCtrl.editProject).put(projectCtrl.editProject).delete(projectCtrl.deleteProject)


export default router;