import { Router } from 'express';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import EventsController from '../Controllers/EventsController';

const eventsRouter = Router();
const eventsController = new EventsController();

eventsRouter.use(ensureAuthenticated);

eventsRouter.get('/', eventsController.index);
eventsRouter.post('/', eventsController.create);
eventsRouter.put('/:id', eventsController.update);
eventsRouter.delete('/:id', eventsController.delete);

export default eventsRouter;
