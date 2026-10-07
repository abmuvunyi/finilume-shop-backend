import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

const mockProductsService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: typeof mockProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [{ provide: ProductsService, useValue: mockProductsService }],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get(ProductsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a product', async () => {
      const createProductDto = { name: 'Test', price: 10 };
      const expectedResult = { id: 1, ...createProductDto };
      service.create.mockResolvedValue(expectedResult);

      const result = await controller.create(createProductDto);
      expect(result).toEqual(expectedResult);
      expect(service.create).toHaveBeenCalledWith(createProductDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const expectedResult = [{ id: 1, name: 'Test', price: 10 }];
      service.findAll.mockResolvedValue(expectedResult);

      const result = await controller.findAll(0, 10);
      expect(result).toEqual(expectedResult);
      expect(service.findAll).toHaveBeenCalledWith(0, 10);
    });
  });

  describe('findOne', () => {
    it('should return a single product', async () => {
      const expectedResult = { id: 1, name: 'Test', price: 10 };
      service.findOne.mockResolvedValue(expectedResult);

      const result = await controller.findOne(1);
      expect(result).toEqual(expectedResult);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update a product', async () => {
      const updateProductDto = { name: 'Updated' };
      const expectedResult = { id: 1, name: 'Updated', price: 10 };
      service.update.mockResolvedValue(expectedResult);

      const result = await controller.update(1, updateProductDto);
      expect(result).toEqual(expectedResult);
      expect(service.update).toHaveBeenCalledWith(1, updateProductDto);
    });
  });

  describe('remove', () => {
    it('should remove a product', async () => {
      const expectedResult = { id: 1, name: 'Test', price: 10 };
      service.remove.mockResolvedValue(expectedResult);

      const result = await controller.remove(1);
      expect(result).toEqual(expectedResult);
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
