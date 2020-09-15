import { Request, Response } from 'express';
import ListPartierAvailabilityService from '../services/ListPartierAvailabilityMonthService';
import AppError from '../errors/AppError';

class PartiersAvailabilityMonthController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { date } = request.query;

    const listPartierAvailabilityService = new ListPartierAvailabilityService();

    if (!date) {
      throw new AppError('You need to choose a date');
    }
    const partierAvailability = await listPartierAvailabilityService.execute({
      id,
      date: date.toString(),
    });

    return response.json(partierAvailability);
  }
}

export default PartiersAvailabilityMonthController;
