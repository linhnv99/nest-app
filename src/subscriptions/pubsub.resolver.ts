import { Inject } from '@nestjs/common';
import { Query } from '@nestjs/graphql';
import { Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { Pet } from 'src/models/pets.model';
import { PetsResolver } from 'src/resolvers/pets/pets.resolver';
import { PetService } from 'src/resolvers/pets/pets.service';

@Resolver()
export class PubSubResolver {
  private EVENT: string = 'event';

  constructor(
    @Inject("PUB_SUB") private pubSub: PubSub,
    private readonly petService: PetService) {
  }

  @Query((returns) => [Pet])
  async publishEvent(): Promise<Pet[]> {
    let pets: Pet[] = await this.petService.findAll();
    this.pubSub.publish(this.EVENT, { pets });
    return pets;
  }

  @Subscription((returns) => [Pet], {
    resolve(this: PetsResolver, value) {
      // console.log(this);
      // console.log(value);
      return value.pets;
    }
  })
  subscribeEvent() {
    this.pubSub.subscribe(this.EVENT, (msg) => {
      console.log(msg);
    });
    return this.pubSub.asyncIterator(this.EVENT);
  }
}
