import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Cat {
  @Field()
  id: string;
  @Field()
  name: string;
  @Field((type) => Int)
  age: number;
  @Field({ nullable: true })
  breed?: string;
}
