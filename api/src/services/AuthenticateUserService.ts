import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';

import User from '../models/User';
import AppError from '../errors/AppError';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user: [User] = await usersRepository.query(
      `SELECT * FROM users WHERE email='${email}' FETCH FIRST ROW ONLY`,
    );

    if (!user || user.length < 1) {
      throw new AppError('Incorrect login credentials', 401);
    }

    const passwordMatch = await compare(password, user[0].password);

    if (!passwordMatch) {
      throw new AppError('Incorrect login credentials', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user[0].id,
      expiresIn,
    });

    return {
      user: user[0],
      token,
    };
  }
}

export default AuthenticateUserService;
