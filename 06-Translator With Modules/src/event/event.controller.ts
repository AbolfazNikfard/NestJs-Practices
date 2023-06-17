import { Body, Controller, Delete, Post } from '@nestjs/common';
import { deleteLikeEventDTO, insertLikeEventDTO } from './dto/event.dto';
import { EventService } from './event.service';

@Controller('event')
export class EventController {
    constructor(private eventService:EventService){}
    @Post("/like")
    insertLikeEvent(@Body() LikeEvent:insertLikeEventDTO){
       return this.eventService.insertLikeEvent(LikeEvent);
    }

    @Delete("/like")
    deleteLikeEvenet(@Body() likeEvent:deleteLikeEventDTO){
        return this.eventService.deleteLikeEvent(likeEvent);
    }
}
