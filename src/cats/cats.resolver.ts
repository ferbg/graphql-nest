import { PubSub } from 'apollo-server-express';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';

import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './models/cat';

@Resolver(() => Cat)
export class CatsResolver {
  private pubSub = new PubSub();
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
    const newCat = await this.catsService.create(input);
    this.pubSub.publish('catAdded', { catAdded: newCat });
    return newCat;
  }

  @Mutation(() => Cat)
  async updateCat(@Args('id') id: string, @Args('input') input: UpdateCatDto) {
    return this.catsService.update(id, input);
  }

  @Mutation(() => [Cat])
  async deleteCat(@Args('id') id: string) {
    return this.catsService.delete(id);
  }

  @Subscription(() => Cat)
  catAdded() {
    return this.pubSub.asyncIterator('catAdded');
  }
}
