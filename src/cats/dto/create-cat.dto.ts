import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateCatDto {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field((type) => Int)
  @IsNotEmpty()
  age: number;

  @Field({ nullable: true })
  breed?: string;
}
