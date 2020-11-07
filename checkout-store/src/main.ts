import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {Logger} from "@nestjs/common";
import {Transport} from "@nestjs/microservices";

const logger = new Logger();

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RMQ_SERVER],
      noAck: false,
      queue: process.env.QUEUE_NAME
    }
  });

  await app.listen(() => {
    logger.log('Micro service On')
  });
}
bootstrap();
