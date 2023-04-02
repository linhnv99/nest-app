import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PetsResolver } from './pets/pets.resolver';
import { APP_FILTER } from '@nestjs/core';
import { ExceptionFilterFilter } from './filters/exception-filter.filter';
import { GraphQLError, GraphQLFormattedError } from 'graphql';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: './schema/schema.gql',
      formatError: (error: GraphQLError) => {
        const graphQLFormattedError: GraphQLFormattedError = {
          message: error.message,
        };
        return graphQLFormattedError;
      },
    }),
  ],
  controllers: [],
  providers: [
    PetsResolver,
    {
      provide: APP_FILTER,
      useClass: ExceptionFilterFilter,
    },
  ],
})
export class AppModule {}
