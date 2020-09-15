import { Router } from 'express';
import eventsRouter from './events.routes';
import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';
import partiersRouter from './partiers.routes';

const routes = Router();

routes.use('/events', eventsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/partiers', partiersRouter);

export default routes;
