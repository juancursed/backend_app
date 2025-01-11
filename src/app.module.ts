import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ForumModule } from './forum/forum.module';

import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/man_db'),
    UserModule,
    ForumModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService ],
})
export class AppModule {}