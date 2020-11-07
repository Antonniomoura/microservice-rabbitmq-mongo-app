import {Injectable, Logger} from '@nestjs/common';
import {CreateProductDto} from "./dtos/create-product.dto";
import {IProduct} from "./interfaces/product.interface";
import {Model} from "mongoose";
import {InjectModel} from '@nestjs/mongoose';
import {AppController} from "./app.controller";
import {RpcException} from "@nestjs/microservices";

@Injectable()
export class AppService {
    private readonly logger: Logger = new Logger(AppController.name);

    constructor(
        @InjectModel('Products') private readonly productModel: Model<IProduct>
    ) {
    }

    async createProduct(createProductDto: CreateProductDto): Promise<any> {
        try {
            const createProduct = new this.productModel(createProductDto)
            return await createProduct.save();
        } catch (error) {
            this.logger.error(`Error ${JSON.stringify(error.massage, null, 2)}`);
            throw new RpcException(error.message)
        }
    }

    async getAll(): Promise<IProduct[]> {
        return await this.productModel.find({}).exec();
    }

}
