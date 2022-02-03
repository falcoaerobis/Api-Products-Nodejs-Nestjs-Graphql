import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateProductInput } from './dto/create-product.inupt';
import { UpdateProductInput } from './dto/update-product.inupt';
import { Products } from './products.entity';
import { ProductsService } from './products.service';

@Resolver()
export class ProductsResolver {

    constructor(
        private prodService: ProductsService
    ){}

    @Query(() => [Products])
    async products(): Promise<Products[]>{
        const prods = await this.prodService.findAllProducts();
        return prods;
    }

    @Query(() => Products)
    async product(
        @Args('id') id: string
    ): Promise<Products>{
        const prod = await this.prodService.findProdById(id);
        return prod;
    }

    @Query(() => Number)
    async qtdProducts(): Promise<number>{
        const qtd = await this.prodService.getQtdProducts();
        return qtd;
    }

    @Query(() => [Products])
    async getMinStock(): Promise<Products[]>{
        const prod = await this.prodService.getMinStock();
        return prod;
    }

    @Query(() => [Products])
    async getMaxStock(): Promise<Products[]>{
        const prod = await this.prodService.getMaxStock();
        return prod;
    }
    @Query(() => [Products])
    async getNoStock(): Promise<Products[]>{
        const prod = await this.prodService.getNoStock();
        return prod;
    }

    @Mutation(() => Products)
    async createProduct(
        @Args('data') data: CreateProductInput
    ) :Promise<Products>{
        const prod = await this.prodService.createProduct(data);
        return prod;
    }

    @Mutation(() => Products)
    async updateProduct(
        @Args('id') id: string,
        @Args('data') data: UpdateProductInput
    ) :Promise<Products>{
        const prod = await this.prodService.updateProduct(id, data);
        return prod;
    }

    @Mutation(() => Boolean)
    async deleteProduct(
        @Args('id') id: string
    ) :Promise<boolean>{
        const prod = await this.prodService.deleteProduct(id);
        return prod;
    }
}
