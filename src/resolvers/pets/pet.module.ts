import { Module } from '@nestjs/common';
import { PetsResolver } from './pets.resolver';
import { PetService } from './pets.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from 'src/models/pets.model';

@Module({
  imports: [TypeOrmModule.forFeature([Pet])],
  providers: [PetsResolver, PetService],
  exports: [PetService, PetsResolver],
})
export class PetModule {}
