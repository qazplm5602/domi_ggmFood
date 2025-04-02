import { Request, Response } from 'express';
import { ParsedUrlQuery } from 'querystring';

export type ExpressReq = Request<{}, any, any, ParsedUrlQuery, Record<string, any>>;
export type ExpressRes = Response<any, Record<string, any>>;