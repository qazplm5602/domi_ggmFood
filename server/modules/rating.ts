import { NextFunction } from "express";
import { DomiError } from "./error.ts";
import { pool } from "./mysql.ts";
import { ExpressReq, ExpressRes } from "./types.ts";
import mysql2 from 'mysql2/promise';

interface RatingBodyType {
    star: number,
    opinions: string[],
    student: number,
    mode: 0 | 1 | 2
}

export async function writeFoodRating(req: ExpressReq, res: ExpressRes, next: NextFunction) {
    return writeFoodRatingInternal(req, res, next);
}

export async function writeFoodRatingInternal(req: ExpressReq, res: ExpressRes, next: NextFunction, connection?: mysql2.PoolConnection) {
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
        // 중복 확인
        const [ [ { count: amountRating } ] ] = await connection.query<any>("SELECT COUNT(*) AS count FROM rating WHERE student = ? AND mode = ? AND DATE(createAt) = DATE(NOW())", [ student, modeString ]);
        if (amountRating > 0) // 머임 이미 있는데 (수정하는 api 가 아님)
            throw new DomiError(400, "RATING0", `이미 ${modeString}식 평가를 하였습니다.`);

        await connection.query("INSERT INTO rating(student, mode, star, createAt) VALUES (?, ?, ?, NOW())", [ student, modeString, Math.floor(star) ]);
        const [ [ { id: ratingId } ] ] = await connection.query("SELECT LAST_INSERT_ID() AS id") as any;

        if (opinions.length > 0) {
            const opinionQuery = mysql2.format(
                "INSERT INTO opinions VALUES ?",
                [[
                    ...opinions.map(v => [ ratingId, v ])
                ]]
            );
    
            await connection.query(opinionQuery);
        }

        await connection.commit();
    } catch (e) {
        await connection.rollback(); // 실패 ~~~~
        next(e);
    } finally {
        connection.release();
    }

    res.send({ ok: true });
}

export async function updateFoodRating(req: ExpressReq, res: ExpressRes, next: NextFunction) {
    // const student = Number(req.body.student);
    // const mode = Number(req.body.mode);

    // // 잘못줌
    // if (isNaN(student) || isNaN(mode) || !validateMode(mode)) {
    //     res.sendStatus(400);
    //     return;
    // }

    const ratingId = Number(req.query.id);
    if (isNaN(ratingId)) {
        res.sendStatus(400);
        return;
    }

    const connection = await pool.getConnection();

    // 일단 삭제
    try {
        // id 찾기
        const [ rows ] = await connection.query<any>("SELECT student, mode FROM rating WHERE id = ?", [ ratingId ]);

        if (rows.length === 0) {
            connection.release();
            res.sendStatus(404); // 등록된게 없는딩
            return;
        }

        const { student, mode } = rows[0];

        await connection.query("DELETE FROM opinions WHERE rating = ?", [ ratingId ]);
        await connection.query("DELETE FROM rating WHERE id = ?", [ ratingId ]);

        req.body.student = Number(student);
        req.body.mode = formatModeToId(mode);
        writeFoodRatingInternal(req, res, next, connection);
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

    const [ rows ] = await pool.query<any>("SELECT id FROM rating WHERE student = ? AND mode = ? AND DATE(createAt) = DATE(NOW())", [ student, formatMode(mode) ]);
    if (rows.length === 0) {
        res.send("-1");
        return;
    }

    res.send(String(rows[0].id));
}

// 오늘 평가 한거 가져옴
export async function getDetailRating(req: ExpressReq, res: ExpressRes) {
    const ratingId = Number(req.query.id)

    // 잘못줌
    if (isNaN(ratingId)) {
        res.sendStatus(400);
        return;
    }

    const query1 = pool.query<any>("SELECT id, mode, star FROM rating WHERE id = ?", [ ratingId ]);
    const query2 = pool.query<any>("SELECT message FROM opinions WHERE rating = ?", [ ratingId ]);

    const [ [ ratings ], [ opinions ] ] = await Promise.all([query1, query2]);
    
    if (ratings.length === 0) {
        res.sendStatus(404);
        return;
    }

    const data = ratings[0];

    res.send({
        // id: ratingId,
        star: data.star,
        mode: formatModeToId(data.mode),
        opinions: opinions.map((v: { message: string }) => v.message)
    });
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

function formatModeToId(modeString: string): number {
    switch (modeString) {
        case '조':
            return 0;
        case '중':
            return 1;
        case '석':
            return 2;
        default:
            throw new Error(`${modeString} is not a valid mode string.`);
    }
}