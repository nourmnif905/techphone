import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  // Example getNextIndex function (simple)
  private async getNextIndex(): Promise<number> {
    const lastProduct = await this.prisma.product.findFirst({
      orderBy: { createdAt: 'desc' },
    });
    return lastProduct ? lastProduct.index + 1 : 1;
  }

  async createProduct(dto: CreateProductDto) {
    const nextIndex = await this.getNextIndex();
    return this.prisma.product.create({
      data: {
        ...dto,
        index: nextIndex,
      },
    });
  }

  async getAllProducts() {
    return this.prisma.product.findMany({ orderBy: { index: 'asc' } });
  }

  async pingDb() {
    try {
      const result = await this.prisma.$runCommandRaw({ ping: 1 });
      return { connected: true, result };
    } catch (error) {
      return { connected: false, error };
    }
  }
  async getProductByNamePrefix(prefix: string) {
  return this.prisma.product.findMany({
    where: {
      title: {
        startsWith: prefix,
        mode: 'insensitive', // so "Gam" matches "game", "Game", etc.
      },
    },
    orderBy: { index: 'asc' },
  });
}

}
