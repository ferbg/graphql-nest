import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { GetUserArgs } from './dto/get-user.args';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './user';
import { UsersService } from './users.service';

@Resolver(() => User) // Dato a manejar
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User, { name: 'user', nullable: true }) // definición de la consulta a realizar
  getUser(@Args() getUserArgs: GetUserArgs): User {
    return this.usersService.getUser(getUserArgs);
  }

  @Mutation(() => User) // definición de la mutación para crear un usuario
  createUser(@Args('createUserData') createUserData: CreateUserDTO): User {
    return this.usersService.createUser(createUserData);
  }
}
