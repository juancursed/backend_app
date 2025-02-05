import { Injectable, InternalServerErrorException } from '@nestjs/common';
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

    async getForum(id : string): Promise<Forum> {
        try {
            return this.forumModel.findById(id).exec();
        } catch{
            throw new error('No forums found');
        }
    }

    async updateForum(id: string, createForumDto: CreateForumDto): Promise<Forum> {
        try {
            return this.forumModel.findByIdAndUpdate(id, createForumDto, {new: true}).exec();
        } catch {   
            throw new error('Error updating forum');
        }
    }
    
    async deleteForum(id: string): Promise<Forum> {
        try {
            return this.forumModel.findByIdAndDelete(id).exec();
        } catch {
            throw new error('Error deleting forum');
        }
    }

    async getAllForumsUser(userId: string): Promise<Forum[]> {
        try {
            
            return await this.forumModel.find({ createdBy: userId }).exec();
        } catch (error) {
            throw new Error('No forums found');
        }
    }
}
