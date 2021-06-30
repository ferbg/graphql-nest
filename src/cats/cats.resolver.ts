import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './models/cat';

@Resolver((of) => Cat)
export class CatsResolver {
  constructor(private catsService: CatsService) {}

  @Query((type) => [Cat])
  async getCats() {
    return this.catsService.list();
  }

  @Query((type) => Cat)
  async getCat(@Args('id') id: string) {
    return this.catsService.findOneById(id);
  }

  @Mutation((type) => Cat)
  async createCat(@Args('input') input: CreateCatDto) {
    return this.catsService.create(input);
  }

  //   @Mutation(type => Cat)
  //   async updateCat(
  //     @Args('input') input: UpdateCatInput,
  //   ) {
  //     return this.catsService.updateCat(input);
  //   }

  @Mutation((type) => [Cat])
  async deleteCat(@Args('id') id: string) {
    return this.catsService.delete(id);
  }
}
