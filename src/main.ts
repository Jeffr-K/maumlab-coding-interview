import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
config();

async function bootstrap() {
  const port = process.env.SERVER_PORT || 4000;
  const app = await NestFactory.create(AppModule);
  await app.listen(port, () => {
    console.log(`Maum Server is Running on :${port}`);
  });
}
bootstrap();
