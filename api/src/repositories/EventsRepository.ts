import { EntityRepository, Repository } from 'typeorm';

import Event from '../models/Event';

@EntityRepository(Event)
class EventsRepository extends Repository<Event> {
  public async findByDate(date: Date): Promise<Event | null> {
    const findEvent: Event[] = await this.query(
      `SELECT * FROM events WHERE date='${date.toISOString()}' FETCH FIRST ROW ONLY`,
    );

    if (findEvent && findEvent.length === 0) {
      return null;
    }

    return findEvent[0] || null;
  }
}

export default EventsRepository;
