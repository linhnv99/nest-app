import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from 'src/models/users.model';
import { CreateUserInput } from './dto/create-user.input';
import { UserService } from './users.service';
@Resolver((of) => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation((returns) => User)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.userService.create(createUserInput);
  }

  
}
