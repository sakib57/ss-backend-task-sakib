import { Request } from 'express';
import { User } from '../entities/user.entity';

interface IUser extends Request {
  user: User;
}

export default IUser;
