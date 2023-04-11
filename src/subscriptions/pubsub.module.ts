import { Module } from '@nestjs/common';
import { PubSubResolver } from './pubsub.resolver';
import { PetModule } from 'src/resolvers/pets/pet.module';

@Module({
  imports: [PetModule],
  controllers: [],
  providers: [PubSubResolver],
})
export class PubSubModule {}
