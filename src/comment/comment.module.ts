import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, CommentSchema } from 'src/schema/comment.schema';
import { Forum, ForumSchema } from 'src/schema/forum.schema';
import { CommentService } from './comment.service';

@Module({
    imports: [ MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
               MongooseModule.forFeature([{ name: Forum.name, schema: ForumSchema }])
             ],
    controllers: [CommentController],
    providers: [CommentService],
    exports: [CommentService]
})
export class CommentModule {}
