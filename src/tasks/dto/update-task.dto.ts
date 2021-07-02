import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateTaskDto {
  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  completed: boolean;
}
