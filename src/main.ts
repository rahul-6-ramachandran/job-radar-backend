import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TelegramService } from './notifications/telegram/telegram.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
  
}
bootstrap();
