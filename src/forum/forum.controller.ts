import { Body, Delete, Get, InternalServerErrorException, Patch, Post, Request } from '@nestjs/common';
import { Controller, Param } from '@nestjs/common';
import { CreateForumDto } from './dto/create-forum.dto';
import { ForumService } from './forum.service';
import { Public } from 'src/auth/public.decorator';

@Controller('forum')
export class ForumController {
    constructor(private readonly forumService: ForumService) {}

    @Get('userForums')
    async getAllForums(@Request() req: any){

        console.log(req.user.id);
        try {
            const userId = req.user.sub; // Asegúrate de que req.user.id existe
            if (!userId) {
                throw new InternalServerErrorException('User ID not found in request');
            }
            return await this.forumService.getAllForumsUser(userId);
        } catch (error) {
            throw new InternalServerErrorException('Error getting forums');
        }
    }


    @Public()
    @Get(':id')
    async getForum(@Param('id') id: string){
        try {
            return this.forumService.getForum(id);
        } catch {
            throw new InternalServerErrorException('Error getting forum');
        }
    }

    @Post('create')
    async createForum(@Body() createForumDto: CreateForumDto, @Request() req: any){
        createForumDto.createdBy = req.user.sub;
        createForumDto.date = new Date(new Date().getTime());
        try {
            return this.forumService.createForum(createForumDto);
        }
        catch {
            throw new InternalServerErrorException('Error creating forum');
        }
        
    }

    @Patch(':id')
    async updateForum(@Param('id') id: string, @Body() createForumDto: CreateForumDto){
       try {
           return this.forumService.updateForum(id, createForumDto);
       } catch {
           throw new InternalServerErrorException('Error updating forum');
       }
    }

    @Delete(':id')
    async deleteForum(@Param('id') id: string){
        try {
            return this.forumService.deleteForum(id);
        } catch {
            throw new InternalServerErrorException('Error deleting forum');
        }
    }

    
    
}

