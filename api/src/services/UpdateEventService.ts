import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Event, { ShiftOptions } from '../models/Event';
import EventsRepository from '../repositories/EventsRepository';
import AppError from '../errors/AppError';

interface Request {
  id: string;
  user_id: string;
  partier_id: string;
  name: string;
  date: Date;
  shift: ShiftOptions;
  address: string;
  blocker?: boolean;
}

class UpdateEventService {
  public async execute({
    id,
    user_id,
    partier_id,
    name,
    date,
    shift,
    address,
    blocker = true,
  }: Request): Promise<Event> {
    const eventsRepository = getCustomRepository(EventsRepository);
    const eventDate = startOfHour(date);

    switch (shift) {
      case ShiftOptions.MORNING:
        eventDate.setHours(9, 0, 0);
        break;
      case ShiftOptions.AFTERNOON:
        eventDate.setHours(13, 0, 0);
        break;
      case ShiftOptions.NIGHT:
        eventDate.setHours(18, 0, 0);
        break;
      default:
        break;
    }

    const eventExists = await eventsRepository.query(
      `SELECT * FROM events WHERE id='${id}'`,
    );

    if (!eventExists || eventExists.length === 0) {
      throw new AppError('Event not found');
    }

    const owner = await eventsRepository.query(
      `SELECT owner_id FROM events WHERE id='${id}'`,
    );

    if (owner[0].owner_id !== user_id) {
      throw new AppError(`You can only update events created by you`, 403);
    }

    const event: Event[][] = await eventsRepository.query(
      `UPDATE events SET name='${name}', date='${date.toISOString()}',
        shift='${shift}', address='${address}', blocker='${blocker}',
        partier_id='${partier_id}' WHERE id='${id}' RETURNING *`,
    );

    return event[0][0];
  }
}

export default UpdateEventService;
