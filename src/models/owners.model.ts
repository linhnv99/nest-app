import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Pet } from './pets.model';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
@ObjectType()
export class Owner {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @OneToMany(() => Pet, pet => pet.owner)
  @Field(() => [Pet], {nullable: 'items'})
  pets: Pet[];
}
