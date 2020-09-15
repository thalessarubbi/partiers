import { EntityRepository, Repository } from 'typeorm';

import { isEqual, startOfDay, isBefore } from 'date-fns';
import Partier from '../models/Partier';
import Event from '../models/Event';

@EntityRepository(Partier)
class PartiersRepository extends Repository<Partier> {
  public chekDayAvailability(
    shift: string,
    shiftAvailable: boolean,
    date: Date,
    events: Event[],
  ): boolean {
    const event: Event | undefined = events.find(
      eventItem =>
        eventItem.shift === shift &&
        isEqual(startOfDay(eventItem.date), startOfDay(date)),
    );

    if (
      isBefore(date, startOfDay(new Date())) ||
      (event && event.blocker) ||
      !shiftAvailable
    ) {
      return false;
    }

    return true;
  }
}

export default PartiersRepository;
