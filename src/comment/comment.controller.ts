import { Controller, 
    Post, 
    Param, 
    Body, 
    InternalServerErrorException, 
    Request, 
    BadRequestException,
    Get,
    UnauthorizedException,
    Delete,
    Patch
 } from '@nestjs/common';

import { Comment } from 'src/schema/comment.schema';
import { CreateCommentDto } from './comment.dto';
import { CommentService } from './comment.service';
import { isValidObjectId } from 'mongoose';

interface CustomRequest extends Request {
    user:{
        sub: string;
    }
}

@Controller('comment')
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @Post('/:forumId')
    async postComment(@Param('forumId') forumId: string, @Body() comment: CreateCommentDto, @Request() req: CustomRequest):Promise<Comment>{      
        
        if (!isValidObjectId(forumId)) {
            throw new BadRequestException('ID de foro inválido');
        }
        
        try {
            const user_comment = req.user.sub;
            const date = new Date(new Date().getTime());
            return this.commentService.postComment(forumId, user_comment, comment, date);
        } catch {
            throw new InternalServerErrorException('Error posting comment');
        }
    }

    @Get('/:userId')
    async getCommentByUser(@Param('userId') userId: string){
        try {
            return this.commentService.getCommentByUser(userId);
        } catch {
            throw new InternalServerErrorException('Error getting comments');
        }
    }

    @Delete(':id')
    async deleteComment(
        @Param('id') commentId: string,
        @Request() req: any
    ) {
        if (!isValidObjectId(commentId)) {
            throw new BadRequestException('ID de comentario inválido');
        }

        try {
            const userId = req.user.sub;
            return await this.commentService.deleteComment(commentId, userId);
        } catch (error) {
            if (error instanceof UnauthorizedException) {
                throw new UnauthorizedException('No autorizado para eliminar este comentario');
            }
            throw new InternalServerErrorException('Error eliminando comentario');
        }
    }

    @Patch(':id')
    async updateComment(
        @Param('id') commentId: string,
        @Body() updateData: CreateCommentDto,
        @Request() req: any
    ) {
        if (!isValidObjectId(commentId)) {
            throw new BadRequestException('ID de comentario inválido');
        }

        try {
            const userId = req.user.sub;
            return await this.commentService.editComment(commentId, userId, updateData);
        } catch (error) {
            if (error instanceof UnauthorizedException) {
                throw new UnauthorizedException('No autorizado para editar este comentario');
            }
            throw new InternalServerErrorException('Error actualizando comentario');
        }
    }

}


