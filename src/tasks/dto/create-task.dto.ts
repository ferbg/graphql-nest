import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateTaskDto {
  @Field()
  @IsNotEmpty()
  title: string;

  @Field()
  description: string;
}
