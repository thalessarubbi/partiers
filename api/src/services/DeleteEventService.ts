import { getCustomRepository } from 'typeorm';
import EventsRepository from '../repositories/EventsRepository';
import AppError from '../errors/AppError';

interface Request {
  id: string;
  user_id: string;
}

class DeleteEventService {
  public async execute({ id, user_id }: Request): Promise<boolean> {
    const eventsRepository = getCustomRepository(EventsRepository);

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
      throw new AppError(`You can only delete events created by you`, 403);
    }

    await eventsRepository.query(`DELETE FROM events WHERE id='${id}'`);

    return true;
  }
}

export default DeleteEventService;
