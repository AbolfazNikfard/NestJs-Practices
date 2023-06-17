import { Body, Controller, Delete, Get,Param,Patch,Post,Put,Query } from '@nestjs/common';
import { UserService } from './user.service';
import { updateUserDTO } from './dto/user.dtos';
import { UserEntity } from './entities/user.entity';
import { paginationDTO } from 'src/dto/pagination.dto';

@Controller('user')
export class UserController {
    constructor(
        private userService:UserService
    ){}

    @Get()
    get(@Query() pagination:paginationDTO){
        return this.userService.get(pagination);
    }

    @Get(":username")
    getById(@Param("username") username){
        return this.userService.getUserBy(username);
    }

    @Post()
    insert(@Body() user:UserEntity){
        return this.userService.insert(user);
    }

    @Patch(":username")
    update(@Body() updateDesiredUserSection:updateUserDTO, @Param("username") username){
        return this.userService.update(updateDesiredUserSection,username);
    }

    @Delete(":username")
    delete(@Param("username") username){
        return this.userService.delete(username)
    }
}
