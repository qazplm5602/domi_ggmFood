import { ExpressReq, ExpressRes } from "./types.ts";

interface RatingBodyType {
    star: number,
    opinions: string[],
    student: number,
    mode: 0 | 1 | 2
}

export function writeFoodRating(req: ExpressReq, res: ExpressRes) {
    const { student, mode, star, opinions }: RatingBodyType = req.body;

    // 타입 검사
    if (typeof student !== "number" || !validateMode(mode) || typeof star !== "number" || typeof opinions !== 'object') {
        res.sendStatus(400);
        return;
    }

    
}

// 조 , 중, 식 타입 검사
function validateMode(mode: any) {
    if (typeof mode !== 'number')
        return false;

    if (mode < 0 || mode > 2)
        return false;

    return true;
}