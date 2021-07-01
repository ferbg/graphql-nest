import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './models/cat';

@Resolver(() => Cat)
export class CatsResolver {
  constructor(private catsService: CatsService) {}

  @Query(() => [Cat])
  async getCats() {
    return this.catsService.list();
  }

  @Query(() => Cat)
  async getCat(@Args('id') id: string) {
    return this.catsService.get(id);
  }

  @Mutation(() => Cat)
  async createCat(@Args('input') input: CreateCatDto) {
    return this.catsService.create(input);
  }

  @Mutation(() => Cat)
  async updateCat(@Args('id') id: string, @Args('input') input: UpdateCatDto) {
    return this.catsService.update(id, input);
  }

  @Mutation(() => [Cat])
  async deleteCat(@Args('id') id: string) {
    return this.catsService.delete(id);
  }
}
