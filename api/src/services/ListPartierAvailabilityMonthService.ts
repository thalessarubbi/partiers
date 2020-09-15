/* eslint-disable no-loop-func */
import { getRepository, getCustomRepository } from 'typeorm';
import { startOfWeek, parseISO, addDays, startOfDay, isEqual } from 'date-fns';
import User from '../models/User';
import AppError from '../errors/AppError';
import Partier from '../models/Partier';
import Availability from '../models/Availability';
import Event, { ShiftOptions } from '../models/Event';
import PartiersRepository from '../repositories/PartiersRepository';

interface Request {
  id: string;
  date: string;
}

interface AvailabilityShifts {
  shift: string;
  available: boolean;
  event?: Event;
}

interface DayAvailability {
  day: number;
  availability: AvailabilityShifts[];
}

interface Response {
  month: number;
  dayAvailabilities: DayAvailability[];
}

class ListPartierAvailabilityMonthService {
  public async execute({ id, date }: Request): Promise<Response> {
    const usersRepository = getRepository(User);
    const eventsRepository = getRepository(Event);
    const partiersRepository = getCustomRepository(PartiersRepository);

    const user: [User] = await usersRepository.query(
      `SELECT * FROM users WHERE id='${id}' FETCH FIRST ROW ONLY`,
    );

    if (!user || user.length < 1 || !user[0].partier_id) {
      throw new AppError('You need to provide a partier id', 404);
    }

    const partier: [Partier] = await partiersRepository.query(
      `SELECT * FROM partiers WHERE partiers.id = '${user[0].partier_id}'
      FETCH FIRST ROW ONLY`,
    );

    const availability: [Availability] = await partiersRepository.query(
      `SELECT * FROM availabilities WHERE availabilities.id = '${partier[0].availability_id}'
      FETCH FIRST ROW ONLY`,
    );

    const events: Event[] = await eventsRepository.query(
      `SELECT * FROM events WHERE partier_id='${id}'`,
    );

    const {
      sunday,
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
      morning,
      afternoon,
      night,
    } = availability[0];

    const dayAvilabilities = [
      sunday,
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
    ];

    const parsedDate = parseISO(date);
    const month = parsedDate.getMonth();
    let dayOfWeek = startOfWeek(parsedDate);

    const availabilities = [];

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 7; i++) {
      const dayAvailability = dayAvilabilities[i];
      availabilities.push({
        day: dayOfWeek.getDate(),
        availability: [
          {
            shift: ShiftOptions.MORNING,
            available:
              dayAvailability &&
              partiersRepository.chekDayAvailability(
                ShiftOptions.MORNING,
                morning,
                dayOfWeek,
                events,
              ),
            event: events.find(
              eventItem =>
                eventItem.shift === ShiftOptions.MORNING &&
                isEqual(startOfDay(eventItem.date), startOfDay(dayOfWeek)),
            ),
          },
          {
            shift: ShiftOptions.AFTERNOON,
            available:
              dayAvailability &&
              partiersRepository.chekDayAvailability(
                ShiftOptions.AFTERNOON,
                afternoon,
                dayOfWeek,
                events,
              ),
            event: events.find(
              eventItem =>
                eventItem.shift === ShiftOptions.AFTERNOON &&
                isEqual(startOfDay(eventItem.date), startOfDay(dayOfWeek)),
            ),
          },
          {
            shift: ShiftOptions.NIGHT,
            available:
              dayAvailability &&
              partiersRepository.chekDayAvailability(
                ShiftOptions.NIGHT,
                night,
                dayOfWeek,
                events,
              ),
            event: events.find(
              eventItem =>
                eventItem.shift === ShiftOptions.NIGHT &&
                isEqual(startOfDay(eventItem.date), startOfDay(dayOfWeek)),
            ),
          },
        ],
      });
      dayOfWeek = addDays(dayOfWeek, 1);
    }

    return { month, dayAvailabilities: availabilities };
  }
}

export default ListPartierAvailabilityMonthService;
