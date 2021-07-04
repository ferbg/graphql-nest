import { CATS } from './../mocks/cats.mock';
import { CatsResolver } from './cats.resolver';
import { CatsService } from './cats.service';
import { Cat } from './models/cat';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

describe('CatsResolver', () => {
  let service: CatsService;
  let resolver: CatsResolver;

  beforeEach(async () => {
    service = new CatsService();
    resolver = new CatsResolver(service);
  });

  afterEach(() => jest.resetAllMocks());

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('getCats', () => {
    it('should return an array of cats', async () => {
      const result = CATS;
      jest.spyOn(service, 'list').mockImplementation(() => CATS);
      expect(await resolver.getCats()).toBe(result);
    });
  });

  describe('getCat', () => {
    it('should return the selected cat', async () => {
      const result: Cat = {
        id: '333333',
        name: 'Cat #333333',
        age: 5,
        breed: 'Bengal',
      };

      jest.spyOn(service, 'get').mockImplementation(() => result);
      expect(await resolver.getCat('333333')).toBe(result);
    });
  });

  describe('createCat', () => {
    it('should return the created cat', async () => {
      const newCat: CreateCatDto = {
        name: 'new cat',
        age: 2,
        breed: 'Persah',
      };
      const result: Cat = {
        ...new Cat(),
        ...{ id: '111-222-333' },
        ...newCat,
      };

      jest
        .spyOn(service, 'create')
        .mockImplementation(() => Promise.resolve(result));
      const addedCat = await resolver.createCat(newCat);

      expect(addedCat).toBeDefined();
      expect(addedCat).toStrictEqual(result);
    });
  });

  describe('updateCat', () => {
    it('should return the updated cat', async () => {
      const catDto: UpdateCatDto = {
        name: 'catName -- modified',
        age: 25,
      };
      const result: Cat = {
        ...{ id: '111-222-333' },
        ...catDto,
      } as Cat;

      jest
        .spyOn(service, 'update')
        .mockImplementation(() => Promise.resolve(result));
      const modifiedCat = await resolver.updateCat('111-222-333', catDto);

      expect(modifiedCat).toBeDefined();
      expect(modifiedCat).toStrictEqual(result);
    });
  });

  describe('deleteCat', () => {
    it('should return an empty array', async () => {
      const result = [CATS[0]];
      jest.spyOn(service, 'delete').mockImplementation(() => result);
      expect(await resolver.deleteCat('333333')).toStrictEqual([CATS[0]]);
    });
  });
});
