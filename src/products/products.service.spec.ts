import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { PrismaService } from '../../prisma/prisma.service';

const mockPrismaService = {
  product: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

describe('ProductsService', () => {
  let service: ProductsService;
  let prismaService: typeof mockPrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    prismaService = module.get(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should successfully create a product', async () => {
      const createProductDto = { name: 'Test', price: 10 };
      const expectedResult = { id: 1, ...createProductDto };
      prismaService.product.create.mockResolvedValue(expectedResult);

      const result = await service.create(createProductDto);
      expect(result).toEqual(expectedResult);
      expect(prismaService.product.create).toHaveBeenCalledWith({
        data: createProductDto,
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const expectedResult = [{ id: 1, name: 'Test', price: 10 }];
      prismaService.product.findMany.mockResolvedValue(expectedResult);

      const result = await service.findAll(0, 10);
      expect(result).toEqual(expectedResult);
      expect(prismaService.product.findMany).toHaveBeenCalledWith({
        skip: 0,
        take: 10,
      });
    });
  });

  describe('findOne', () => {
    it('should return a single product', async () => {
      const expectedResult = { id: 1, name: 'Test', price: 10 };
      prismaService.product.findUnique.mockResolvedValue(expectedResult);

      const result = await service.findOne(1);
      expect(result).toEqual(expectedResult);
      expect(prismaService.product.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });

  describe('update', () => {
    it('should update and return a product', async () => {
      const updateProductDto = { name: 'Updated' };
      const expectedResult = { id: 1, name: 'Updated', price: 10 };
      prismaService.product.update.mockResolvedValue(expectedResult);

      const result = await service.update(1, updateProductDto);
      expect(result).toEqual(expectedResult);
      expect(prismaService.product.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateProductDto,
      });
    });
  });

  describe('remove', () => {
    it('should delete and return a product', async () => {
      const expectedResult = { id: 1, name: 'Test', price: 10 };
      prismaService.product.delete.mockResolvedValue(expectedResult);

      const result = await service.remove(1);
      expect(result).toEqual(expectedResult);
      expect(prismaService.product.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });
});
