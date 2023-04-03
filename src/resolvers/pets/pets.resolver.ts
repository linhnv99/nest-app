import { Resolver, Query, Mutation, Args, Int, ResolveField } from '@nestjs/graphql';
import { CreatePetInput } from './dto/create-pet.input';
import { Pet } from 'src/models/pets.model';
import { PetService } from './pets.service';

@Resolver((of) => Pet)
export class PetsResolver {
  constructor(private petService: PetService) { }

  @Query((returns) => [Pet])
  async pets(): Promise<Pet[]> {
    return this.petService.findAll();
  }

  @Mutation((returns) => Pet)
  async createPet(
    @Args('createPetInput') createPetInput: CreatePetInput,
  ): Promise<Pet> {
    return this.petService.createPet(createPetInput);
  }

  @Mutation(returns => String)
  async deletePet(@Args("ids", {type: () => [Int]}) ids: number[]): Promise<string> {
    return this.petService.deleteById(ids);
  }
}
