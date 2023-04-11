import { Query } from '@nestjs/graphql';
import { Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { Pet } from 'src/models/pets.model';
import { PetService } from 'src/resolvers/pets/pets.service';

@Resolver()
export class PubSubResolver {
  private pubSub: PubSub;

  private EVENT: string = 'event';

  constructor(private readonly petService: PetService) {
    this.pubSub = new PubSub();
  }

  @Query((returns) => [Pet])
  async publishEvent(): Promise<Pet[]> {
    let pets: Pet[] = await this.petService.findAll();
    this.pubSub.publish(this.EVENT, {pets});
    return pets;
  }

  @Subscription((returns) => [Pet], {
    resolve: value => value.pets
  })
  subscribeEvent() {
    this.pubSub.subscribe(this.EVENT, (msg) => {
      console.log(msg);
    });
    return this.pubSub.asyncIterator(this.EVENT);
  }
}
