import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Forum } from '../schema/forum.schema';
import { CreateForumDto } from './dto/create-forum.dto';
import { error } from 'console';


@Injectable()
export class ForumService {
    constructor(@InjectModel(Forum.name) private forumModel: Model<Forum>) {}

    async createForum(createForumDto: CreateForumDto): Promise<Forum> {
        try {

            const newForum = new this.forumModel(createForumDto);
            return newForum.save();
        } catch (error) {
            throw error;
        }
    }

    async getForum(): Promise<Forum[]> {
        try {
            return this.forumModel.find().exec();
        } catch{
            throw new error('No forums found');
        }
    }
}
