import { corsCallback } from "types/corsCallback";
import { allowedOrigin } from "./allowedOrigin";

export const corsOptions = {
    origin : (origin : string  , cb : corsCallback )=>{
        if(allowedOrigin.indexOf(origin) !== -1 || !origin ){
            cb(null , true);
        }else{
            cb(new Error("not allowed by cors")) ; 
        }
    }
}