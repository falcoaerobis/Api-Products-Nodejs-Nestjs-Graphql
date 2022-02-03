import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductInput } from './dto/create-product.inupt';
import { UpdateProductInput } from './dto/update-product.inupt';
import { Products } from './products.entity';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Products)
        private productRepository: Repository<Products>
    ){}

    async findAllProducts(): Promise<Products[]>{
        const prods = await this.productRepository.find();
        return prods;
    }

    async findProdById(id: string): Promise<Products>{
        const prod = await this.productRepository.findOne(id);
        if(!prod){
            throw new NotFoundException('Produto não encontrado');
        }
        return prod;
    }

    async getQtdProducts(): Promise<number>{
        const prod = await this.productRepository.count();
        if(!prod){
            throw new NotFoundException('Produto não encontrado');
        }
        return prod;
    }

    async getMinStock(): Promise<Products[]>{
        const prod = await this.productRepository.query('select * from products order by stock limit 1');
        if(!prod){
            throw new NotFoundException('Produto não encontrado');
        }
        return prod;
    }

    async getMaxStock(): Promise<Products[]>{
        const prod = await this.productRepository.query('select * from products order by stock desc limit 1');
        if(!prod){
            throw new NotFoundException('Produto não encontrado');
        }
        return prod;
    }

    async getNoStock(): Promise<Products[]>{
        const prod = await this.productRepository.query('select * from products where stock < 5');
        if(!prod){
            throw new NotFoundException('Produto não encontrado');
        }
        return prod;
    }

    async createProduct(data: CreateProductInput): Promise<Products>{
        const prod = this.productRepository.create(data);
        const prodSaved = await this.productRepository.save(prod);

        if(!prodSaved){
            throw new InternalServerErrorException('Erro ao criar produto')
        }

        return prodSaved;
    }

    async updateProduct(id: string, data: UpdateProductInput): Promise<Products>{
        const prod = await this.findProdById(id);
        
        await this.productRepository.update(prod, {...data});

        const prodUpdated = this.productRepository.create({...prod, ...data});

        return prodUpdated;
    }

    async deleteProduct(id: string): Promise<boolean>{
        const prod = await this.findProdById(id);

        const deleted = await this.productRepository.delete(prod);
        if(deleted){
            return true;
        }
        return false;

    }
}
