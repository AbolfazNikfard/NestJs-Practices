import { Body, Controller, Post } from '@nestjs/common';
import { insertConfigurationDTO } from './dto/configuration.dto';
import { ConfigurationService } from './configuration.service';

@Controller('configuration')
export class ConfigurationController {
    constructor(private configurationService:ConfigurationService){

    }
    @Post()
    insertConfig(@Body() configuration:insertConfigurationDTO){
        return this.configurationService.insert(configuration);
    }
}
