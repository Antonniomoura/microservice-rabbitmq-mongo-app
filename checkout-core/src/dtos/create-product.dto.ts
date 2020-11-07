import { IsString } from "class-validator";

export class CreateProductDto {
    @IsString()
    readonly name: string;

    @IsString()
    readonly quantity: number;

    @IsString()
    readonly value: number;

    @IsString()
    readonly idClient: number;
}