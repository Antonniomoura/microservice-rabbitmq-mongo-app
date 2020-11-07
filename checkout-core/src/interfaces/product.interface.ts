import { Document } from 'mongoose';

export interface IProduct extends Document {
    readonly name: string;
    readonly quantity: number;
    readonly value: number;
    readonly idClient: number;
}