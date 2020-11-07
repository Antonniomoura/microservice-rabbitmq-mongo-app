import {Body, Controller, Get, Logger, Post} from '@nestjs/common';
import {ClientProxy, ClientProxyFactory, Transport} from "@nestjs/microservices";
import {CreateProductDto} from "./dtos/create-product.dto";
import {AppService} from "./app.service";

@Controller('api/v1')
export class AppController {
    private clientAdminBackend: ClientProxy;
    private logger: Logger = new Logger(AppController.name);

    constructor(
        private readonly appService: AppService
    ) {
        this.clientAdminBackend = ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: [process.env.RMQ_SERVER],
                queue: process.env.QUEUE_NAME
            }
        })
    }

    @Post('/products')
    async createProduct(
        @Body() createProductDto: CreateProductDto
    ) {
        this.logger.log(createProductDto)
        return this.clientAdminBackend.emit(
            process.env.CREATE_PRODUCT,
            createProductDto
        )
    }

    @Get('/products')
    async getAll() {
        return await this.appService.getAll()
    }

}
