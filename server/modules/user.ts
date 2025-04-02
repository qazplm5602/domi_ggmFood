import { pool } from "./mysql.ts";
import { ExpressReq, ExpressRes } from "./types.ts";

export default async function getUsersHandler(req: ExpressReq, res: ExpressRes) {
    const [ users ] = await pool.query("SELECT id, grade, class, num, name FROM students");
    res.send(users);
}