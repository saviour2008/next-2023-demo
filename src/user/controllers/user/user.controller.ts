import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDTO } from 'src/user/dtos/createUser.dto';
import { CreateUserPostDTO } from 'src/user/dtos/createUserPost.dto';
import { CreateUserProfileDTO } from 'src/user/dtos/createUserProfile.dto';
import { UpdateUserDTO } from 'src/user/dtos/updateUser.dto';
import { UserService } from 'src/user/services/user/user.service';

@Controller('users')
export class UserController {
  constructor(public userService: UserService) {}

  @Get()
  async getUsers() {
    const users = await this.userService.getUsers();
    return users;
  }

  @Post('create')
  createUser(@Body() userData: CreateUserDTO) {
    const { confirmPassword, ...userDataDetail } = userData;
    this.userService.createUser(userDataDetail);
  }

  @Patch(':id')
  async updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUser: UpdateUserDTO,
  ) {
    await this.userService.updateUser(id, updateUser);
    return { msg: '更新成功' };
  }

  @Delete(':id')
  async deleteUserById(@Param('id', ParseIntPipe) id: number) {
    await this.userService.deleteUser(id);
    return { msg: '删除成功' };
  }

  @Post(':id/profile')
  createUserProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() createUserProfile: CreateUserProfileDTO,
  ) {
    return this.userService.createUserProfile(id, createUserProfile);
  }

  @Post(':id/post')
  createUserPost(
    @Param('id', ParseIntPipe) id: number,
    @Body() createUserPost: CreateUserPostDTO,
  ) {
    return this.userService.createUserPost(id, createUserPost);
  }
}
