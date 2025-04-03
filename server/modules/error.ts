import { NextFunction } from "express";
import { ExpressReq, ExpressRes } from "./types.ts";

export async function errorHandler(err: Error, req: ExpressReq, res: ExpressRes, next: NextFunction) {
    console.error(err);
    res.sendStatus(500);
}