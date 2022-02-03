import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from './products.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Products])
  ],
  providers: [ProductsService, ProductsResolver]
})
export class ProductsModule {}
