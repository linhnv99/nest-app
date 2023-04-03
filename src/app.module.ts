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
      playground: true
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3390,
      username: 'username',
      password: 'password',
      database: 'test',
      entities: [Pet, Owner],
      synchronize: true,
    }),
    PetModule
  ],
  controllers: [],
  providers: [OwnersResolver],
})
export class AppModule {}
