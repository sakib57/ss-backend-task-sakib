import {
  HttpException,
  HttpStatus,
  Injectable,
  NotAcceptableException,
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

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
