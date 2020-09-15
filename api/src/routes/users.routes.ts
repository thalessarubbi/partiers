import { Router } from 'express';
import UsersController from '../Controllers/UsersController';

const usersRouter = Router();

const usersController = new UsersController();

usersRouter.post('/', usersController.create);

export default usersRouter;
