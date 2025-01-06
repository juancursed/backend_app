import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { User } from '../schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: ObjectId): Promise<User> {
    return this.userModel.findById(id);
  }

  async deleteUser(id: ObjectId): Promise<User> {
    return this.userModel.findByIdAndDelete(id);
  }

  async updateUser(id: ObjectId, createUserDto: CreateUserDto): Promise<User> {
    try {
      return this.userModel.findByIdAndUpdate(id, createUserDto, { new: true });
    } catch (error) {
      return error;
    }
  }
}
