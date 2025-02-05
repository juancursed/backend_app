import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Comment } from 'src/schema/comment.schema';
import { Forum } from 'src/schema/forum.schema';
import { CreateCommentDto } from './comment.dto';


@Injectable()
export class CommentService {
    constructor(@InjectModel(Comment.name) private commentModel: Model<Comment>,
        @InjectModel(Forum.name) private forumModel: Model<Forum>) { }

    async postComment(forumId: string, userId: string, dto: CreateCommentDto, date: Date): Promise<Comment> {
        {

            const newComment :Comment = new this.commentModel({
                forum: forumId,
                createdBy: userId,
                body: dto.body,
                date,
                photo: dto.photo
            });

            try {
                await newComment.save();
            } catch (error) {
                throw new InternalServerErrorException('Error al guardar comentario');
            }

            await this.forumModel.findByIdAndUpdate(forumId, {
                $push: { responses: newComment._id }
            });

            return newComment;
        }
    }

    async getCommentByUser(userId: string) {
        try {
            return await this.commentModel.find({ createdBy: userId }).exec();
        } catch {
            throw new InternalServerErrorException('Error getting comments');
        }

    }

    async deleteComment(commentId: string, userId: string) {
        try {
            const comment = await this.commentModel.findById(commentId);
            
            if (!comment) {
                throw new NotFoundException('Comentario no encontrado');
            }
            
            if (comment.createdBy.toString() !== userId) {
                throw new UnauthorizedException();
            }

            // Eliminar comentario y su referencia en el foro
            const deletedComment = await this.commentModel.findByIdAndDelete(commentId);
            
            await this.forumModel.findByIdAndUpdate(
                deletedComment.forum,
                { $pull: { responses: commentId } }
            );

            return deletedComment;
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async editComment(commentId: string, userId: string, updateData: CreateCommentDto) {
        try {
            const comment = await this.commentModel.findById(commentId);

            if (!comment) {
                throw new NotFoundException('Comentario no encontrado');
            }
            
            if (comment.createdBy.toString() !== userId) {
                throw new UnauthorizedException();
            }
            return await this.commentModel.findByIdAndUpdate(
                commentId,
                { 
                    body: updateData.body,
                    photo: updateData.photo,
                    editedAt: new Date() 
                },
                { new: true }
            );
        }  catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }
}
