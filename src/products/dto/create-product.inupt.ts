import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";

@InputType()
export class CreateProductInput {
    @IsString()
    @IsNotEmpty({message : 'Informe o nome do produto'})
    @Field()
    name: string;
    @IsString()
    @Field()
    manufacturer : string;
    @Field()
    stock : number;
    @Field()
    value: number;

}