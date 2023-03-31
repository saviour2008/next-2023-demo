import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserDataDTO } from 'src/user/dtos/userData.dto';
import { AuthGuard } from 'src/user/guards/auth/auth.guard';
import { ValidateCreateUserPipe } from 'src/user/pipes/validate-create-user/validate-create-user.pipe';
import { UserService } from 'src/user/services/user/user.service';

@Controller('user')
// @UseGuards(AuthGuard)
export class UserController {
  constructor(public userService: UserService) {}
  @Get()
  getUsers(@Query('sortBy', ParseBoolPipe) sortBy: boolean) {
    // get请求的query参数
    console.log(sortBy);
    const users = this.userService.fetchUsers();
    // return { name: 'zhangliang', age: 18 };
    return { sortBy, users };
  }

  @Post('create')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe()) // 给输入的post内容加校验，跟body对应的entity一致
  createUser(@Body(ValidateCreateUserPipe) userData: UserDataDTO) {
    return {};
  }

  @Get(':id/:postId')
  getUserById(
    @Param('id', ParseIntPipe) id: number, // ParseIntPipe就是把字符串转换成number类型
    @Param('postId') postId: string,
  ) {
    console.log(typeof id);
    const user = this.userService.fetchUserById(id);
    if (!user) {
      throw new HttpException('user not found', HttpStatus.BAD_REQUEST);
    }
    return user;
  }
}
