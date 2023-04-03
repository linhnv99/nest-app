import { Resolver, Query } from '@nestjs/graphql';

@Resolver()
export class OwnersResolver {
  @Query(returns => String) 
  hello() {
    return "hello"
  }
}
