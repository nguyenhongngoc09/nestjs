import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAllUsers(): Promise<any> {
    return await this.usersService.getUsers();
  }

  @Get(':userId/posts')
  getUserPosts(@Param('userId', ParseIntPipe) userId: number): any {
    return this.usersService.getUserPosts(userId);
  }
}
