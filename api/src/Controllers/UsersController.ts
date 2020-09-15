import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';

class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password, role, partier } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
      role,
      partier,
    });

    return response.json(user);
  }
}

export default UsersController;
