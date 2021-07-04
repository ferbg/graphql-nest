import { Test, TestingModule } from '@nestjs/testing';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './models/cat';
import { CatsService } from './cats.service';

describe('CatsService', () => {
  let service: CatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CatsService],
    }).compile();

    service = module.get<CatsService>(CatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('listing', () => {
    it('shoud return the list', () => {
      expect(service.list()).toBeDefined();
    });
  });

  describe('getting by id', () => {
    it('shoud return a cat for a valid id', () => {
      const cat: Cat = service.get('1');
      expect(cat).toBeDefined();
      expect(cat.id).toBeDefined();
      expect(cat.name).toBeDefined();
      expect(cat.age).toBeDefined();
    });

    it('should throw an error for an invalid id', () => {
      expect(() => {
        service.get('333333');
      }).toThrowError('Cat not found');
    });
  });

  describe('creating cat', () => {
    it('shoud create the new cat', async () => {
      const newCat: CreateCatDto = {
        name: 'new cat',
        age: 2,
      };
      const addedCat: Cat = await service.create(newCat);

      expect(addedCat).toBeDefined();
      expect(addedCat.id).toBeDefined();
      expect(addedCat.name).toEqual(newCat.name);
      expect(addedCat.age).toEqual(newCat.age);
      //  Undefined for optional values
      expect(addedCat.breed).toBeUndefined();
    });

    it('shoud create the new cat with optional properties', async () => {
      const newCat: CreateCatDto = {
        name: 'new cat',
        age: 2,
        breed: 'Persah',
      };
      const addedCat: Cat = await service.create(newCat);

      expect(addedCat).toBeDefined();
      expect(addedCat.id).toBeDefined();
      expect(addedCat.name).toEqual(newCat.name);
      expect(addedCat.age).toEqual(newCat.age);
      //  breed is defined
      expect(addedCat.breed).toBeDefined();
      expect(addedCat.breed).toEqual(newCat.breed);
    });
  });

  describe('updating cat', () => {
    let theCat: Cat;
    beforeAll(async () => {
      const newCat: CreateCatDto = {
        name: 'new cat',
        age: 33,
      };
      theCat = await service.create(newCat);
    });

    it('shoud update the cat', async () => {
      const catDto: UpdateCatDto = {
        name: theCat.name + ' -- modified',
        age: theCat.age + 5,
      };

      const modifiedCat: Cat = await service.update(theCat.id, catDto);

      expect(modifiedCat).toBeDefined();
      expect(modifiedCat.id).toEqual(theCat.id);
      expect(modifiedCat.name).toEqual(catDto.name);
      expect(modifiedCat.age).toEqual(catDto.age);

      //  Breed has not been modified
      expect(modifiedCat.breed).toEqual(theCat.breed);
    });

    it('shoud mark as completed the cat', async () => {
      const catDto: UpdateCatDto = {
        breed: 'Persah',
      };

      const modifiedCat: Cat = await service.update(theCat.id, catDto);

      expect(modifiedCat).toBeDefined();
      expect(modifiedCat.breed).toEqual(catDto.breed);

      //  Name and age has not been modified
      expect(modifiedCat.name).toEqual(theCat.name);
      expect(modifiedCat.age).toEqual(theCat.age);
    });
  });

  describe('deleting cat', () => {
    let theCat: Cat;
    let catsCount: number;
    beforeAll(async () => {
      const newCat: CreateCatDto = {
        name: 'new cat',
        age: 33,
      };
      theCat = await service.create(newCat);
      catsCount = await service.list().length;
    });

    it('shoud delete the cat', async () => {
      const cats: Cat[] = await service.delete(theCat.id);
      //  A cat have been removed
      expect(catsCount - 1).toEqual(cats.length);
    });

    it('should throw an error for an invalid id', () => {
      expect(() => {
        service.delete('333333');
      }).toThrowError('Cat not found');
    });
  });
});
