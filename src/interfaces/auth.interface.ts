// import { Request } from 'express';
// import { User } from '../models/user.model';


// export interface IPayload extends Request {
//   user: typeof User;
// }
import { Request } from 'express';
import { IUser } from './user.interface';

export interface AuthenticatedRequest extends Request {
  user: IUser;
}

export interface IPayload {
  id: string;
  iat: number;
  exp: number;
}
