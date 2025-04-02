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
    return writeFoodRatingInternal(req, res);
}

export async function writeFoodRatingInternal(req: ExpressReq, res: ExpressRes, connection?: mysql2.PoolConnection) {
    const { student, mode, star, opinions }: RatingBodyType = req.body;

    // 타입 검사
    if (typeof student !== "number" || !validateMode(mode) || typeof star !== "number" || star < 0 || star > 5 || typeof opinions !== 'object') {
        if (connection) { // 이미 열려 이씅면 뿌숨
            connection.rollback().finally(() => connection?.release());
        }

        res.sendStatus(400);
        return;
    }

    const modeString = formatMode(mode);

    // 데베 사용 ㄱㄱ
    // const connection = await pool.getConnection();
    if (!connection) {
        connection = await pool.getConnection();
    }

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

export async function updateFoodRating(req: ExpressReq, res: ExpressRes) {
    const student = Number(req.query.student);
    const mode = Number(req.query.mode);

    // 잘못줌
    if (isNaN(student) || isNaN(mode) || !validateMode(mode)) {
        res.sendStatus(400);
        return;
    }

    const connection = await pool.getConnection();

    // 일단 삭제
    try {
        // id 찾기
        const [ rows ] = await connection.query<any>("SELECT id FROM rating WHERE student = ? AND mode = ? AND DATE(createAt) = DATE(NOW())", [ student, formatMode(mode) ]);

        if (rows.length === 0) {
            connection.release();
            res.sendStatus(404); // 등록된게 없는딩
            return;
        }

        const ratingId = rows[0].id;

        await connection.query("DELETE FROM opinions WHERE rating = ?", [ ratingId ]);
        await connection.query("DELETE FROM rating WHERE id = ?", [ ratingId ]);

        req.body.student = student;
        req.body.mode = mode;
        writeFoodRatingInternal(req, res, connection);
    } catch {
        connection.rollback()
            .finally(() => connection.release());
        return;
    }
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

    const [ [ { count } ] ] = await pool.query<any>("SELECT COUNT(*) as count FROM rating WHERE student = ? AND mode = ? AND DATE(createAt) = DATE(NOW())", [ student, formatMode(mode) ]);
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