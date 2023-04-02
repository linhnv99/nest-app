import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class PetsResolver {
  @Query(() => String)
  hello(): string {
    if (5 < 10) {
      throw new Error('Exception');
    }
    return 'Hello graphql';
  }
}
