import { NextFunction, Request, Response } from "express";
import { ApplicationError } from "../error";

export const errorHandling = async (err: Error, req: Request, res: Response, next: NextFunction) => {
    switch (true) {
        case err instanceof ApplicationError:
            res.status(err.status).json({error: err.message})
            break
        default:
            res.status(500).json({error: 'Internal Server Error'});
    }
}