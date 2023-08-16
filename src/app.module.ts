import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { throttlerConfig } from './config/throttler.config';

@Module({
  imports: [ThrottlerModule.forRoot(throttlerConfig), UserModule],
})
export class AppModule {}
