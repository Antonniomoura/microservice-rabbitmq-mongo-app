import {Injectable} from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {IProduct} from './interfaces/product.interface';

@Injectable()
export class AppService {
    constructor(
        @InjectModel('Products') private readonly productModel: Model<IProduct>
    ) {
    }

    getAll(): Promise<IProduct[]> {
        return this.productModel.find({}).exec()
    }
}
