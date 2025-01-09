import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Forum } from '../schema/forum.schema';
import { CreateForumDto } from './dto/create-forum.dto';

@Injectable()
export class ForumService {
    constructos(InjectModel(Forum.name) private forumModel: Model<Forum>) {}

}
