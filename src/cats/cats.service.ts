import { v4 as uuidv4 } from 'uuid';

import { HttpException, Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';

import { Cat } from './models/cat';

import { CATS } from 'src/mocks/cats.mock';

@Injectable()
export class CatsService {
  cats: Cat[];

  constructor() {
    this.cats = CATS;
  }

  public list(): Cat[] {
    return this.cats;
  }

  public findOneById(id: string): Cat {
    return this.cats.find((cat) => cat.id === id);
  }

  public async create(dto: CreateCatDto): Promise<Cat> {
    const newCat: Cat = {
      id: uuidv4(),
      ...dto,
    };
    this.cats.push(newCat);
    return newCat;
  }

  public delete(id: string): Cat[] {
    const taskIndex = this.cats.findIndex((item) => item.id === id);
    if (taskIndex === -1) {
      throw new HttpException('Cat not found', 404);
    }

    this.cats.splice(taskIndex, 1);
    return this.cats;
  }
}
