import * as bcrypt from 'bcrypt';
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { User } from '../schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(createUserDto.password, saltOrRounds);

    
    try {
      const newUser = new this.userModel({
        ...createUserDto,
        password: hashedPassword,
      });
  
      return newUser.save();  

    } catch (error) {
      throw new InternalServerErrorException('Error creating user');
    }
    
  }

  async validatePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async findAll(): Promise<User[]> {
    try {
      return this.userModel.find().exec();
    } catch (error) {
      throw new InternalServerErrorException('Error fetching users');
    }
  }

  async findOne(id: ObjectId): Promise<User> {
    try {
      const user = await this.userModel.findById(id);
      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      return user;
    } catch (error) {
      throw error instanceof NotFoundException ? error : new InternalServerErrorException('Error fetching user');
    }
  }

  async findByEmail(email: string): Promise<User> {
    try {
      const user = await this.userModel.findOne({ email });
      return user;
    } catch (error) {
      throw new InternalServerErrorException('Error fetching user');
    }
  }

  async deleteUser(id: ObjectId): Promise<User> {
    try {
      const deletedUser = await this.userModel.findByIdAndDelete(id);
      if (!deletedUser) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      return deletedUser;
    } catch (error) {
      throw error instanceof NotFoundException ? error : new InternalServerErrorException('Error deleting user');
    }
  }

  async updateUser(id: ObjectId, createUserDto: CreateUserDto): Promise<User> {
    try {
      const updatedUser = await this.userModel.findByIdAndUpdate(id, createUserDto, { new: true });
      if (!updatedUser) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      return updatedUser;
    } catch (error) {
      throw error instanceof NotFoundException ? error : new InternalServerErrorException('Error updating user');
    }
  }
}
