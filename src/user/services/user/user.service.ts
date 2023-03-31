import { Injectable } from '@nestjs/common';
import { User } from 'src/utils/types';

@Injectable()
export class UserService {
  private users: User[] = [
    { username: 'jack', email: 'jack@' },
    { username: 'alan', email: 'alan@' },
  ];
  fetchUsers() {
    return this.users;
  }
}
