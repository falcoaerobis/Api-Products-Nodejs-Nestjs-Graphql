import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Products{

    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id: number;

    @Column()
    name: string;

    @Column()
    manufacturer : string;

    @Column()
    stock : number;

    @Column()
    value: number;

}