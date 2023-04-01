import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/typeorm/entities/post';
import { Profile } from 'src/typeorm/entities/profile';
import { User } from 'src/typeorm/entities/user';
import {
  CreateUserParams,
  CreateUserPostParams,
  CreateUserProfileParams,
  UpdateUserParams,
} from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}

  getUsers() {
    return this.userRepository.find({ relations: ['profile', 'posts'] }); // 异步, 里面的值是user表对应的属性
  }

  createUser(createUserDetail: CreateUserParams) {
    const user = this.userRepository.create({
      ...createUserDetail,
      createdAt: new Date(),
    }); // 同步
    return this.userRepository.save(user); // 异步  返回是用户本身
  }

  updateUser(id: number, userInfo: UpdateUserParams) {
    return this.userRepository.update({ id }, userInfo);
  }

  deleteUser(id: number) {
    return this.userRepository.delete({ id });
  }

  async createUserProfile(id, userProfile: CreateUserProfileParams) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user)
      throw new HttpException(
        'User not found, could not create user profile',
        HttpStatus.BAD_REQUEST,
      );
    const profile = this.profileRepository.create(userProfile);
    const savedProfile = await this.profileRepository.save(profile);
    user.profile = savedProfile;
    return this.userRepository.save(user);
  }

  async createUserPost(id, userPost: CreateUserPostParams) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user)
      throw new HttpException(
        'User not found, could not create user profile',
        HttpStatus.BAD_REQUEST,
      );
    const newUserPost = { user, ...userPost };
    const post = this.postRepository.create(newUserPost);
    return this.postRepository.save(post);
  }
}
