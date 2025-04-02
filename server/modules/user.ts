import { ExpressReq, ExpressRes } from "./types.ts";

export default function getUsersHandler(req: ExpressReq, res: ExpressRes) {
    res.send("seeee");
}