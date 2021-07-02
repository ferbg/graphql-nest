import { v4 as uuidv4 } from 'uuid';

import { HttpException, Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';

import { Cat } from './models/cat';

import { CATS } from './../mocks/cats.mock';
import { UpdateCatDto } from './dto/update-cat.dto';

@Injectable()
export class CatsService {
  cats: Cat[];

  constructor() {
    this.cats = CATS;
  }

  public list(): Cat[] {
    return this.cats;
  }

  public get(id: string): Cat {
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

  public async update(id: string, dto: UpdateCatDto): Promise<Cat> {
    const index = this.cats.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new HttpException('Cat not found', 404);
    }

    const cat: Cat = this.cats.find((cat) => cat.id === id);
    if (dto.name) {
      cat.name = dto.name;
    }
    if (dto.age) {
      cat.age = dto.age;
    }
    if (dto.breed) {
      cat.breed = dto.breed;
    }
    return this.cats.find((cat) => cat.id === id);
  }

  public delete(id: string): Cat[] {
    const index = this.cats.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new HttpException('Cat not found', 404);
    }

    this.cats.splice(index, 1);
    return this.cats;
  }
}
