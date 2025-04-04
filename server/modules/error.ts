import { NextFunction } from "express";
import { ExpressReq, ExpressRes } from "./types.ts";

export class DomiError extends Error {
    status: number = -1;
    code: string = "DOMI0";
    message: string = "domi-empty";

    constructor(status: number, code: string, message: string) {
        super(`domiError code: ${code}`);
        
        this.status = status;
        this.code = code;
        this.message = message;
    }
}

export async function errorHandler(err: Error, req: ExpressReq, res: ExpressRes, next: NextFunction) {
    console.error(err);

    if (!(err instanceof DomiError)) {
        res.sendStatus(500);
        return;
    }

    const domiErr = err as DomiError;
    res.status(domiErr.status).send({
        code: domiErr.code,
        message: domiErr.message
    });
}