import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ForumController } from './forum.controller';
import { ForumService } from './forum.service';
import { ForumSchema } from '../schema/forum.schema';

@Module({
    imports: [ MongooseModule.forFeature([{ name: 'Forum', schema: ForumSchema }]) ],
    controllers: [ForumController],
    providers: [ForumService],
})
export class ForumModule {}
