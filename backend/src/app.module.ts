import { Module } from '@nestjs/common';
import { ProductModule } from './produit/product.module';

@Module({
  imports: [ProductModule],
})
export class AppModule {}
