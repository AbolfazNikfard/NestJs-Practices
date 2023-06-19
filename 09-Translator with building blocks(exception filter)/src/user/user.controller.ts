import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { updateUserDTO } from './dto/user.dtos';
import { UserEntity } from './entities/user.entity';
import { paginationDTO } from 'src/dto/pagination.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  get(@Query() pagination: paginationDTO) {
    return this.userService.get(pagination);
  }

  @Get(':username')
  async getById(@Param('username') username) {
    const user = await this.userService.getUserBy(username);
    if (!user) throw new NotFoundException();
    return user;
  }

  @Post()
  insert(@Body() user: UserEntity) {
    return this.userService.insert(user);
  }

  @Patch(':username')
  async update(
    @Body() updateDesiredUserSection: updateUserDTO,
    @Param('username') username,
  ) {
    const result = await this.userService.update(
      updateDesiredUserSection,
      username,
    );
    if (!result) throw new NotFoundException();
    return result;
  }

  @Delete(':username')
  async delete(@Param('username') username) {
    const result = await this.userService.delete(username);
    if (!result) throw new NotFoundException();
    return result;
  }
}
