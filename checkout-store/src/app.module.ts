import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ConfigModule} from "@nestjs/config";
import {MongooseModule} from "@nestjs/mongoose";
import {ProductSchema} from "./schemas/product.schema";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        MongooseModule.forRoot(process.env.MONGO_SERVER, {
            useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false
        }),
        MongooseModule.forFeature([
            {name: 'Products', schema: ProductSchema},
        ])
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
