import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Event, { ShiftOptions } from '../models/Event';
import EventsRepository from '../repositories/EventsRepository';
import AppError from '../errors/AppError';
import ListPartierAvailabilityMonthService from './ListPartierAvailabilityMonthService';

interface Request {
  owner_id: string;
  partier_id: string;
  name: string;
  date: Date;
  address: string;
  blocker?: boolean;
}

class CreateEventService {
  public async execute({
    owner_id,
    partier_id,
    name,
    date,
    address,
    blocker = true,
  }: Request): Promise<Event> {
    const eventsRepository = getCustomRepository(EventsRepository);
    const eventDate = startOfHour(date);
    let shift: ShiftOptions;

    if (eventDate.getHours() < 13) {
      shift = ShiftOptions.MORNING;
    } else if (eventDate.getHours() < 18) {
      shift = ShiftOptions.AFTERNOON;
    } else {
      shift = ShiftOptions.NIGHT;
    }

    const findEventInSameDate = await eventsRepository.findByDate(eventDate);

    if (findEventInSameDate) {
      throw new AppError(`There's already an event on this date`);
    }

    const listPartierAvailabilityMonthService = new ListPartierAvailabilityMonthService();

    const availability = await listPartierAvailabilityMonthService.execute({
      id: partier_id,
      date: eventDate.toISOString(),
    });

    const eventDateAvailability = availability.dayAvailabilities.find(
      availabilityItem => availabilityItem.day === eventDate.getDate(),
    );
    const eventShift = eventDateAvailability?.availability.find(
      shiftAvailabilty => shiftAvailabilty.shift === shift,
    );

    if (!eventShift?.available) {
      throw new AppError('This partier is not available on this date');
    }

    const event = eventsRepository.create({
      owner_id,
      partier_id,
      name,
      date: eventDate,
      shift,
      address,
      blocker,
    });

    await eventsRepository.query(
      `INSERT INTO events (name, date, shift, address, blocker, owner_id,
        partier_id) VALUES ('${event.name}', '${event.date.toISOString()}',
         '${event.shift}', '${event.address}', '${event.blocker}',
         '${event.owner_id}', '${event.partier_id}')`,
    );

    return event;
  }
}

export default CreateEventService;
