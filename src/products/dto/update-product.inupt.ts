import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

@InputType()
export class UpdateProductInput {
    @IsOptional()
    @IsString()
    @IsNotEmpty({message : 'Informe o nome do produto'})
    @Field()
    name?: string;

    @IsOptional()
    @IsString()
    @Field()
    manufacturer? : string;
    
    @IsOptional()
    @Field()
    stock?: number;
    
    @IsOptional()
    @Field()
    value?: number;

}