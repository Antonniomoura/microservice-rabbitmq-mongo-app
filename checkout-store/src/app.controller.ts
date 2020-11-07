import {Controller, Get, Logger} from '@nestjs/common';
import {AppService} from './app.service';
import {Ctx, EventPattern, Payload, RmqContext} from "@nestjs/microservices";
import {IProduct} from "./interfaces/product.interface";

@Controller()
export class AppController {
    private logger: Logger = new Logger()

    constructor(
        private readonly appService: AppService
    ) {
    }

    @EventPattern('create-product')
    async createProduct(
        @Payload() product: IProduct,
        @Ctx() context: RmqContext
    ) {
        const channel = context.getChannelRef();
        const originalMsg = context.getMessage();

        this.logger.log(`Product: ${JSON.stringify(product)}`);

        try {
            console.log(product)
            await this.appService.createProduct(product);
            await channel.ack(originalMsg);
        } catch (error) {
            this.logger.error(`error: ${JSON.stringify(error.message)}`);
            await channel.ack(originalMsg)
        }
    }
}
