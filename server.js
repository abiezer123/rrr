const express = require("express");
const path = require("path");
const crypto = require("crypto");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3000;

// =========================================================
// MIDDLEWARE
// =========================================================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =========================================================
// DATABASE
// =========================================================

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,

    ssl: {
        rejectUnauthorized: false
    }
});

// =========================================================
// VISITOR ID COOKIE
// =========================================================
//
// Each browser gets a random visitor ID.
//
// Example:
// visitor_id = 7b3c...
//
// This is NOT their name or real identity.
// It simply lets us associate page visits and answers
// from the same browser.
//

function getCookie(req, name) {
    const cookies = req.headers.cookie;

    if (!cookies) {
        return null;
    }

    const parts = cookies.split(";");

    for (const part of parts) {
        const [key, ...valueParts] = part.trim().split("=");

        if (key === name) {
            return decodeURIComponent(
                valueParts.join("=")
            );
        }
    }

    return null;
}


function createVisitorId() {
    return crypto.randomUUID();
}


function getOrCreateVisitorId(req, res) {
    let visitorId =
        getCookie(req, "visitor_id");

    if (!visitorId) {

        visitorId =
            createVisitorId();

        res.cookie = true;

        res.setHeader(
            "Set-Cookie",
            `visitor_id=${encodeURIComponent(visitorId)}; Path=/; HttpOnly; SameSite=Lax`
        );
    }

    return visitorId;
}

// =========================================================
// RECORD PAGE VISIT
// =========================================================

async function recordVisit(req, res) {

    const visitorId =
        getOrCreateVisitorId(req, res);

    try {

        await pool.query(
            `
            INSERT INTO page_visits
            (
                visitor_id
            )
            VALUES
            (
                $1
            )
            `,
            [visitorId]
        );

        console.log(
            "PAGE VISIT:",
            visitorId
        );

    } catch (error) {

        console.error(
            "PAGE VISIT ERROR:",
            error
        );
    }

    return visitorId;
}

// =========================================================
// SERVE INDEX PAGE
// =========================================================
//
// IMPORTANT:
// This route comes BEFORE express.static()
// so every time index.html is opened,
// a visit is recorded.
//

app.get("/", async (req, res) => {

    await recordVisit(req, res);

    res.sendFile(
        path.join(
            __dirname,
            "public",
            "index.html"
        )
    );
});


app.get("/index.html", async (req, res) => {

    await recordVisit(req, res);

    res.sendFile(
        path.join(
            __dirname,
            "public",
            "index.html"
        )
    );
});

// =========================================================
// STATIC FILES
// =========================================================

app.use(
    express.static(
        path.join(
            __dirname,
            "public"
        )
    )
);

// =========================================================
// TEST DATABASE
// =========================================================

app.get(
    "/api/test-db",
    async (req, res) => {

        try {

            const result =
                await pool.query(
                    "SELECT NOW() AS current_time"
                );

            res.json({
                success: true,
                message:
                    "Database connected successfully",
                time:
                    result.rows[0].current_time
            });

        } catch (error) {

            console.error(
                "DATABASE TEST ERROR:",
                error
            );

            res.status(500).json({
                success: false,
                message:
                    "Database connection failed",
                error:
                    error.message
            });
        }
    }
);

// =========================================================
// SAVE QUESTIONNAIRE ANSWERS
// =========================================================
//
// The frontend sends:
//
// {
//     response: {
//         subject: "...",
//         name: "Rina",
//         "Remembered - Favorite color": "...",
//         ...
//     }
// }
//
// visitor_id comes from the browser cookie.
//

app.post(
    "/api/answers",
    async (req, res) => {

        try {

            const visitorId =
                getOrCreateVisitorId(
                    req,
                    res
                );

            const response =
                req.body?.response;

            if (!response) {

                return res.status(400).json({
                    success: false,
                    message:
                        "response is required"
                });
            }

            await pool.query(
                `
                INSERT INTO answers
                (
                    visitor_id,
                    response
                )
                VALUES
                (
                    $1,
                    $2
                )
                `,
                [
                    visitorId,
                    response
                ]
            );

            console.log(
                "QUESTIONNAIRE SAVED:",
                visitorId
            );

            res.json({
                success: true,
                message:
                    "Answers saved successfully"
            });

        } catch (error) {

            console.error(
                "ANSWER SAVE ERROR:",
                error
            );

            res.status(500).json({
                success: false,
                message:
                    "Failed to save answers",
                error:
                    error.message
            });
        }
    }
);

// =========================================================
// ADMIN — DASHBOARD SUMMARY
// =========================================================

app.get(
    "/api/admin/summary",
    async (req, res) => {

        try {

            const visits =
                await pool.query(
                    `
                    SELECT COUNT(*) AS total
                    FROM page_visits
                    `
                );

            const uniqueVisitors =
                await pool.query(
                    `
                    SELECT COUNT(
                        DISTINCT visitor_id
                    ) AS total
                    FROM page_visits
                    `
                );

            const submissions =
                await pool.query(
                    `
                    SELECT COUNT(*) AS total
                    FROM answers
                    `
                );

            res.json({

                success: true,

                totalVisits:
                    Number(
                        visits.rows[0].total
                    ),

                uniqueVisitors:
                    Number(
                        uniqueVisitors.rows[0].total
                    ),

                totalSubmissions:
                    Number(
                        submissions.rows[0].total
                    )
            });

        } catch (error) {

            console.error(
                "ADMIN SUMMARY ERROR:",
                error
            );

            res.status(500).json({
                success: false,
                message:
                    "Failed to load summary"
            });
        }
    }
);

// =========================================================
// ADMIN — ALL PAGE VISITS
// =========================================================

app.get(
    "/api/admin/visits",
    async (req, res) => {

        try {

            const result =
                await pool.query(
                    `
                    SELECT
                        id,
                        visitor_id,
                        visited_at
                    FROM page_visits
                    ORDER BY
                        visited_at DESC
                    `
                );

            res.json({
                success: true,
                visits:
                    result.rows
            });

        } catch (error) {

            console.error(
                "ADMIN VISITS ERROR:",
                error
            );

            res.status(500).json({
                success: false,
                message:
                    "Failed to load visits"
            });
        }
    }
);

// =========================================================
// ADMIN — ALL QUESTIONNAIRE ANSWERS
// =========================================================

app.get(
    "/api/admin/answers",
    async (req, res) => {

        try {

            const result =
                await pool.query(
                    `
                    SELECT
                        id,
                        visitor_id,
                        response,
                        submitted_at
                    FROM answers
                    ORDER BY
                        submitted_at DESC
                    `
                );

            res.json({
                success: true,
                answers:
                    result.rows
            });

        } catch (error) {

            console.error(
                "ADMIN ANSWERS ERROR:",
                error
            );

            res.status(500).json({
                success: false,
                message:
                    "Failed to load answers"
            });
        }
    }
);

// =========================================================
// ADMIN — COMPLETE DASHBOARD DATA
// =========================================================

app.get(
    "/api/admin/dashboard",
    async (req, res) => {

        try {

            const visits =
                await pool.query(
                    `
                    SELECT
                        id,
                        visitor_id,
                        visited_at
                    FROM page_visits
                    ORDER BY
                        visited_at DESC
                    `
                );

            const answers =
                await pool.query(
                    `
                    SELECT
                        id,
                        visitor_id,
                        response,
                        submitted_at
                    FROM answers
                    ORDER BY
                        submitted_at DESC
                    `
                );

            const totalVisits =
                visits.rows.length;

            const uniqueVisitors =
                new Set(
                    visits.rows.map(
                        row =>
                            row.visitor_id
                    )
                ).size;

            res.json({

                success: true,

                summary: {
                    totalVisits,
                    uniqueVisitors,
                    totalSubmissions:
                        answers.rows.length
                },

                visits:
                    visits.rows,

                answers:
                    answers.rows
            });

        } catch (error) {

            console.error(
                "ADMIN DASHBOARD ERROR:",
                error
            );

            res.status(500).json({
                success: false,
                message:
                    "Failed to load dashboard"
            });
        }
    }
);

// =========================================================
// 404
// =========================================================

app.use(
    (req, res) => {

        res.status(404).json({
            success: false,
            message:
                "Route not found"
        });

    }
);

// =========================================================
// START SERVER
// =========================================================

app.listen(
    PORT,
    () => {

        console.log(
            `Server running on http://localhost:${PORT}`
        );

    }
);