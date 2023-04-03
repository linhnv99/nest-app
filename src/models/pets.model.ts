import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Owner } from './owners.model';

@Entity()
@ObjectType()
export class Pet {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field(() => String, { nullable: true })
  name: string;

  @Column()
  @Field(() => Int, { nullable: true, description: 'Age of pet' })
  age?: number;

  @ManyToOne(() => Owner, (owner) => owner.pets)
  @Field(() => Owner, {nullable: true})
  owner: Owner;
}
