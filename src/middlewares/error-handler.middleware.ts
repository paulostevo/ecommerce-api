import { Express, Request, Response, NextFunction } from "express";
import { ValidationError } from "../errors/validation.error";
import { InternalServerError } from "../errors/internal-server.error";
import { NotFoundError } from "../errors/not-found.error";
import { errors } from "celebrate";


export const errorHandler = (app: Express) =>{
    app.use(errors());
    app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    
        if(error instanceof ValidationError){
            error.send(res);
        }else if(error instanceof NotFoundError){
            error.send(res);
        }
        else{
            new InternalServerError().send(res);
        }
    });
}
