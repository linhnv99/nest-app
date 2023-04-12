import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { OwnersResolver } from './resolvers/owners/owners.resolver';
import { PetsResolver } from './resolvers/pets/pets.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetModule } from './resolvers/pets/pet.module';
import { Pet } from './models/pets.model';
import { Owner } from './models/owners.model';
import { PubSubModule } from './subscriptions/pubsub.module';
import { PubSub } from 'graphql-subscriptions';
import { GlobalModule } from './shared/global.module';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { User } from './models/users.model';
import { UserModule } from './resolvers/users/users.module';


@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: './schema/schema.gql',
      // formatError: (error: GraphQLError) => {
      //   const graphQLFormattedError: GraphQLFormattedError = {
      //     message: error?.message,
      //   };
      //   return graphQLFormattedError;
      // },
      introspection: true,
      playground: true,
      installSubscriptionHandlers: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3390,
      username: 'username',
      password: 'password',
      database: 'test',
      entities: [Pet, Owner, User],
      synchronize: true,
    }),
    RedisModule.forRoot({
      config: {
        host: 'localhost',
        port: 6380,
        password: 'linhnv123'
      }
    }),
    GlobalModule,
    PetModule,
    PubSubModule,
    UserModule
  ],
  controllers: [],
  providers: [
    OwnersResolver
  ],
  exports: []
})
export class AppModule { }
