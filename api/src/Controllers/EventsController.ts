import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import CreateEventService from '../services/CreateEventService';
import EventsRepository from '../repositories/EventsRepository';
import UpdateEventService from '../services/UpdateEventService';
import DeleteEventService from '../services/DeleteEventService';

class EventsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const eventsRepository = getCustomRepository(EventsRepository);
    const events = await eventsRepository.query('SELECT * FROM events');

    return response.json(events);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { partier_id, name, date, address, blocker } = request.body;

    const parsedDate = parseISO(date);

    const createEvent = new CreateEventService();

    const event = await createEvent.execute({
      owner_id: id,
      partier_id,
      name,
      date: parsedDate,
      address,
      blocker,
    });

    return response.json(event);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { id } = request.params;
    const { partier_id, name, date, shift, address, blocker } = request.body;

    const updateEvent = new UpdateEventService();

    const parsedDate = parseISO(date);

    const event = await updateEvent.execute({
      id,
      user_id,
      partier_id,
      name,
      date: parsedDate,
      shift,
      address,
      blocker,
    });

    return response.json(event);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { id } = request.params;

    const deleteEvent = new DeleteEventService();

    await deleteEvent.execute({
      id,
      user_id,
    });

    return response.status(201).send();
  }
}

export default EventsController;
