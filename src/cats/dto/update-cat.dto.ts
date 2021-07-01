import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateCatDto {
  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  age: number;

  @Field({ nullable: true })
  breed?: string;
}
