import { Router } from 'express';
import PartiersAvailabilityMonthController from '../Controllers/PartiersAvailabilityMonthController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import PartiersAvailableController from '../Controllers/PartiersAvailableController';

const partiersRouter = Router();

const partiersAvailabilityMonthController = new PartiersAvailabilityMonthController();
const partiersAvailableController = new PartiersAvailableController();

partiersRouter.use(ensureAuthenticated);

partiersRouter.get('/', partiersAvailableController.index);
partiersRouter.get(
  '/month-availability',
  partiersAvailabilityMonthController.index,
);

export default partiersRouter;
