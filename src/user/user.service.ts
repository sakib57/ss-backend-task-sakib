import {
  HttpException,
  HttpStatus,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateUserInput } from './dto/update-user.input';
import { User, UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';
import { CreateUserInput } from './dto/create-user.input';
import { UserInput } from './dto/user.input';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    try {
      const userInput = new UserInput();
      userInput.email = createUserInput.email.toLocaleLowerCase();
      const isUserExist = await this.findByEmail(userInput.email);
      if (isUserExist) {
        return Promise.reject(
          new NotAcceptableException(
            `User already exist with the ${userInput.email}`,
          ),
        );
      }
      userInput.password = bcrypt.hashSync(createUserInput.password, 8);
      const registerModel = new this.userModel(userInput);
      return await registerModel.save();
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  // Find user by email
  async findByEmail(email: string) {
    return await this.userModel.findOne({
      email: email,
    });
  }

  async findOne(id: string) {
    return await this.userModel.findOne({
      _id: id,
    });
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    try {
      const user = await this.findOne(id);
      if (!user) {
        return Promise.reject(new NotFoundException('User not found'));
      }
      const userInput = new UserInput();
      userInput.firstName = updateUserInput.firstName;
      userInput.lastName = updateUserInput.laststName;
      userInput.permissions = JSON.stringify(updateUserInput.permissions);
      const setUser = { ...updateUserInput, ...userInput };
      return await user.set(setUser).save();
    } catch (error) {
      throw new HttpException(error, error.status || HttpStatus.BAD_REQUEST);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
