import { pool } from "./mysql.ts";
import { ExpressReq, ExpressRes } from "./types.ts";
import mysql2 from 'mysql2/promise';

interface RatingBodyType {
    star: number,
    opinions: string[],
    student: number,
    mode: 0 | 1 | 2
}

export async function writeFoodRating(req: ExpressReq, res: ExpressRes) {
    const { student, mode, star, opinions }: RatingBodyType = req.body;

    // 타입 검사
    if (typeof student !== "number" || !validateMode(mode) || typeof star !== "number" || star < 0 || star > 5 || typeof opinions !== 'object') {
        res.sendStatus(400);
        return;
    }

    const modeString = formatMode(mode);

    // 데베 사용 ㄱㄱ
    const connection = await pool.getConnection();

    try {
        await connection.query("INSERT INTO rating(student, mode, star, createAt) VALUES (?, ?, ?, NOW())", [ student, modeString, Math.floor(star) ]);
        const [ [ { id: ratingId } ] ] = await connection.query("SELECT LAST_INSERT_ID() AS id") as any;

        const opinionQuery = mysql2.format(
            "INSERT INTO opinions VALUES ?",
            [[
                ...opinions.map(v => [ ratingId, v ])
            ]]
        );

        // console.log(opinions, opinionQuery);
        await connection.query(opinionQuery);

        await connection.commit();
    } catch (e) {
        await connection.rollback(); // 실패 ~~~~
        res.sendStatus(500);
        console.error(e);
        return;
    } finally {
        connection.release();
    }

    res.send({ ok: true });
}

// 오늘 이미 평가를 했는지 물어봄
export async function getAlreadyRating(req: ExpressReq, res: ExpressRes) {
    const student = Number(req.query.student);
    const mode = Number(req.query.mode);

    // 잘못줌
    if (isNaN(student) || isNaN(mode) || !validateMode(mode)) {
        res.sendStatus(400);
        return;
    }

    const [ [ { count } ] ] = await pool.query<any>("SELECT COUNT(*) as count FROM rating WHERE student = ? AND mode = ? AND DATE(createAt) = DATE(NOW())", [ student, mode ]);
    res.send(count > 0);
}

// 조 , 중, 식 타입 검사
function validateMode(mode: any) {
    if (typeof mode !== 'number')
        return false;

    if (mode < 0 || mode > 2)
        return false;

    return true;
}

function formatMode(mode: number) {
    switch (mode) {
        case 0:
            return '조';
        case 1:
            return '중';
        case 2:
            return '석';
        default:
            throw new Error(`${mode} faild mode format.`);
    }
}