import { Router } from 'express';
import SessionController from '../Controllers/SessionController';

const sessionsRouter = Router();

const sessionController = new SessionController();

sessionsRouter.post('/', sessionController.create);

export default sessionsRouter;
