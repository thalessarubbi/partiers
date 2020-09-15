import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User, { UserRole } from '../models/User';
import AppError from '../errors/AppError';
import Partier, { CategoryOptions } from '../models/Partier';
import Availability from '../models/Availability';

interface Request {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  partier: {
    category: CategoryOptions;
    price: number;
    availability: {
      sunday: boolean;
      monday: boolean;
      tuesday: boolean;
      wednesday: boolean;
      thursday: boolean;
      friday: boolean;
      saturday: boolean;
      morning: boolean;
      afternoon: boolean;
      night: boolean;
    };
  };
}

class CreateUserService {
  public async execute({
    name,
    email,
    password,
    role,
    partier,
  }: Request): Promise<User> {
    const usersRepository = getRepository(User);
    const partiersRepository = getRepository(Partier);
    const availabilitiesRepository = getRepository(Availability);

    const userExists: [] = await usersRepository.query(
      `SELECT * FROM users WHERE email='${email}' FETCH FIRST ROW ONLY`,
    );

    if (userExists && userExists.length > 0) {
      throw new AppError('E-mail address already in use');
    }

    const hashedPassword = await hash(password, 10);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    if (role === 'client') {
      await usersRepository.query(
        `INSERT INTO users (name, email, password, role) VALUES
        ('${user.name}', '${user.email}', '${user.password}','${user.role}');`,
      );

      delete user.password;

      return user;
    }

    const { category, price, availability } = partier;

    const partierCreation = partiersRepository.create({
      category,
      price,
    });

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
    } = availability;

    const availabilityCreation = availabilitiesRepository.create({
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
    });

    const availableId = await availabilitiesRepository.query(
      `INSERT INTO availabilities (sunday, monday, tuesday, wednesday,
        thursday, friday, saturday, morning, afternoon,
        night) VALUES ('${availabilityCreation.sunday}',
        '${availabilityCreation.monday}', '${availabilityCreation.tuesday}',
        '${availabilityCreation.wednesday}','${availabilityCreation.thursday}',
        '${availabilityCreation.friday}', '${availabilityCreation.saturday}',
        '${availabilityCreation.morning}',
        '${availabilityCreation.afternoon}',
        '${availabilityCreation.night}') RETURNING id;`,
    );

    const partierId = await usersRepository.query(
      `INSERT INTO partiers (category, price, availability_id) VALUES
      ('${partierCreation.category}', '${partierCreation.price}',
      '${availableId[0].id}') RETURNING id;`,
    );

    await usersRepository.query(
      `INSERT INTO users (name, email, password, role, partier_id) VALUES
      ('${user.name}', '${user.email}', '${user.password}','${user.role}',
      '${partierId[0].id}') RETURNING id;`,
    );

    delete user.password;

    return user;
  }
}

export default CreateUserService;
