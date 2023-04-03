import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pet } from 'src/models/pets.model';
import { Repository } from 'typeorm';
import { CreatePetInput } from './dto/create-pet.input';

@Injectable()
export class PetService {
  constructor(@InjectRepository(Pet) private petRepository: Repository<Pet>) { }

  async createPet(createPetInput: CreatePetInput): Promise<Pet> {
    let pet = this.petRepository.create(createPetInput);
    return this.petRepository.save(pet);
  }

  async findAll(): Promise<Pet[]> {
    return this.petRepository.find();
  }

  async deleteById(ids: number[]): Promise<string> {
    await this.petRepository.delete(ids)

    return "SUCCESS";
  }
}