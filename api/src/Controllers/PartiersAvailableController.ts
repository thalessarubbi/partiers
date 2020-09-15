import { Request, Response } from 'express';
import AppError from '../errors/AppError';
import ListPartiersAvailableService from '../services/ListPartiersAvailableService';

class PartiersAvailableController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { category, date } = request.query;

    const listPartiersAvailableService = new ListPartiersAvailableService();

    if (!category) {
      throw new AppError('You need to choose a category');
    }

    if (!date) {
      throw new AppError('You need to choose a date');
    }

    const partiersAvailable = await listPartiersAvailableService.execute({
      category: category.toString(),
      date: date.toString(),
    });

    return response.json(partiersAvailable);
  }
}

export default PartiersAvailableController;
