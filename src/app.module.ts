import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ForumController } from './forum/forum.controller';
import { ForumService } from './forum/forum.service';
import { ForumModule } from './forum/forum.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/man_db'),
    UserModule,
    ForumModule,
  ],
  controllers: [AppController, ForumController],
  providers: [AppService, ForumService],
})
export class AppModule {}