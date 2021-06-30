import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { GetUserArgs } from './dto/get-user.args';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './user';

@Injectable()
export class UsersService {
  private users: User[] = []; // listado en memoria

  public createUser(createUserData: CreateUserDTO): User {
    // creación de usuario
    const user: User = {
      userId: uuidv4(),
      ...createUserData,
    };
    this.users.push(user);
    return user;
  }

  public getUser(getUserArgs: GetUserArgs): User {
    // listado de usuarios
    return this.users.find((user) => user.userId === getUserArgs.userId);
  }
}
