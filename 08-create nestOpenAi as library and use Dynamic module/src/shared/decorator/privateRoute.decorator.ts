import { SetMetadata, applyDecorators } from "@nestjs/common";
import { PRIVATEROUTE_METADATA} from "../constant/shared.constant";

export function privateRoute(){
    return applyDecorators(SetMetadata(PRIVATEROUTE_METADATA,true))
}