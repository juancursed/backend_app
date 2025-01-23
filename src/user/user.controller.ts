import { Controller, Get, Post, Delete, Put, Body, Param, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { ObjectId } from 'mongoose';
import { Public } from 'src/auth/public.decorator';

@Controller('users')
export class UserController {
    constructor(private UserService: UserService) { }

    @Get()
    async getUsers(): Promise<User[]> {
        return this.UserService.findAll();
    }

    @Get(':id')
    getUserProfile(@Param('id') id :ObjectId ): Promise<User> {
        return this.UserService.findOne(id);
    }

    @Public()
    @Post('signup')
    async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        const new_user = await this.UserService.create(createUserDto);
        return new_user;
    }

    @Patch(':id')
    updateUser(@Param('id') id: ObjectId, @Body() createUserDto :CreateUserDto):Promise<User> {
        return this.UserService.updateUser(id, createUserDto);
    }

    @Delete(':id')
    deleteUser(@Param('id') id :ObjectId): Promise<User> {
        return this.UserService.deleteUser(id);
    }

    @Public()
    @Get('profile/:email')
    async getUserByEmail(@Param('email') email: string): Promise<User> {
        return this.UserService.findByEmail(email);
    }

}
