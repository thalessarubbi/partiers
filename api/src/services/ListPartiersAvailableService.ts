/* eslint-disable no-loop-func */
import { getCustomRepository, getRepository } from 'typeorm';
import { parseISO, isBefore } from 'date-fns';
import Partier from '../models/Partier';
import EventsRepository from '../repositories/EventsRepository';
import { ShiftOptions } from '../models/Event';
import AppError from '../errors/AppError';

interface Request {
  category: string;
  date: string;
}

interface Response {
  id: string;
  name: string;
  price: number;
}

class ListPartiersAvailableService {
  public async execute({ category, date }: Request): Promise<Response[]> {
    const usersRepository = getRepository(Partier);
    const eventsRepository = getCustomRepository(EventsRepository);
    const parsedDate = parseISO(date);

    if (isBefore(parsedDate, new Date())) {
      throw new AppError(`You need to select a future date`);
    }

    let shift = '';

    if (parsedDate.getHours() < 13) {
      shift = ShiftOptions.MORNING;
    } else if (parsedDate.getHours() < 18) {
      shift = ShiftOptions.AFTERNOON;
    } else {
      shift = ShiftOptions.NIGHT;
    }

    const availableDaysOfWeek = [
      'sunday',
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
    ];

    const weekDay = availableDaysOfWeek[parsedDate.getDay()];

    const users = await usersRepository.query(
      `SELECT u.id, u.name, p.price FROM (
        (users AS u INNER JOIN partiers AS p ON u.partier_id=p.id)
        INNER JOIN availabilities AS a ON p.availability_id=a.id)
        WHERE p.category='${category}' AND a.${shift} AND a.${weekDay}`,
    );

    const partiersAvailable = [];

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < users.length; i++) {
      const partier = users[0];

      // eslint-disable-next-line no-await-in-loop
      const blockerEvent = await eventsRepository.query(
        `SELECT * FROM events WHERE partier_id='${partier.id}' AND blocker`,
      );
      if (!blockerEvent || blockerEvent.length === 0) {
        partiersAvailable.push({
          id: partier.id,
          name: partier.name,
          price: partier.price,
        });
      }
    }

    return partiersAvailable;
  }
}

export default ListPartiersAvailableService;
