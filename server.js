const express = require("express");
const path = require("path");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// =========================
// MIDDLEWARE
// =========================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve files from public folder
app.use(express.static(path.join(__dirname, "public")));

// =========================
// DATABASE
// =========================

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

// Test database connection
pool.query("SELECT NOW()")
    .then(() => {
        console.log("DATABASE CONNECTED");
    })
    .catch((error) => {
        console.error("DATABASE CONNECTION FAILED:", error);
    });

// =========================
// HOME PAGE
// =========================

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// =========================
// RECORD PAGE VISIT
// =========================

app.post("/api/visit", async (req, res) => {
    try {
        const visitorId = req.body?.visitor_id;

        if (!visitorId) {
            return res.status(400).json({
                success: false,
                message: "visitor_id is required"
            });
        }

        await pool.query(
            `
            INSERT INTO page_visits (visitor_id)
            VALUES ($1)
            `,
            [visitorId]
        );

        res.json({
            success: true,
            message: "Visit recorded"
        });

    } catch (error) {
        console.error("VISIT ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Failed to record visit"
        });
    }
});

// =========================
// SAVE QUESTIONNAIRE ANSWERS
// =========================

app.post("/api/answers", async (req, res) => {
    try {
        const visitorId = req.body?.visitor_id;
        const response = req.body?.response;

        console.log("ANSWER REQUEST:");
        console.log("Visitor ID:", visitorId);
        console.log("Response:", response);

        if (!visitorId) {
            return res.status(400).json({
                success: false,
                message: "visitor_id is required"
            });
        }

        if (!response) {
            return res.status(400).json({
                success: false,
                message: "response is required"
            });
        }

        await pool.query(
            `
            INSERT INTO answers (visitor_id, response)
            VALUES ($1, $2::jsonb)
            `,
            [
                visitorId,
                JSON.stringify(response)
            ]
        );

        console.log("ANSWERS SAVED");

        res.json({
            success: true,
            message: "Answers saved successfully"
        });

    } catch (error) {
        console.error("ANSWER ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Failed to save answers",
            error: error.message
        });
    }
});

// =========================
// ADMIN SUMMARY
// =========================

app.get("/api/admin/summary", async (req, res) => {
    try {
        const totalVisits = await pool.query(
            `SELECT COUNT(*) FROM page_visits`
        );

        const uniqueVisitors = await pool.query(
            `SELECT COUNT(DISTINCT visitor_id) FROM page_visits`
        );

        const totalSubmissions = await pool.query(
            `SELECT COUNT(*) FROM answers`
        );

        res.json({
            success: true,
            summary: {
                totalVisits: Number(totalVisits.rows[0].count),
                uniqueVisitors: Number(uniqueVisitors.rows[0].count),
                totalSubmissions: Number(totalSubmissions.rows[0].count)
            }
        });

    } catch (error) {
        console.error("SUMMARY ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Failed to get summary"
        });
    }
});

// =========================
// ADMIN VISITS
// =========================

app.get("/api/admin/visits", async (req, res) => {
    try {
        const result = await pool.query(
            `
            SELECT
                id,
                visitor_id,
                visited_at
            FROM page_visits
            ORDER BY visited_at DESC
            `
        );

        res.json({
            success: true,
            visits: result.rows
        });

    } catch (error) {
        console.error("VISITS ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Failed to get visits"
        });
    }
});

// =========================
// ADMIN ANSWERS
// =========================

app.get("/api/admin/answers", async (req, res) => {
    try {
        const result = await pool.query(
            `
            SELECT
                id,
                visitor_id,
                response,
                submitted_at
            FROM answers
            ORDER BY submitted_at DESC
            `
        );

        res.json({
            success: true,
            answers: result.rows
        });

    } catch (error) {
        console.error("ANSWERS ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Failed to get answers"
        });
    }
});

// =========================
// ADMIN DASHBOARD
// =========================

app.get("/api/admin/dashboard", async (req, res) => {
    try {

        const visits = await pool.query(
            `
            SELECT
                id,
                visitor_id,
                visited_at
            FROM page_visits
            ORDER BY visited_at DESC
            `
        );

        const answers = await pool.query(
            `
            SELECT
                id,
                visitor_id,
                response,
                submitted_at
            FROM answers
            ORDER BY submitted_at DESC
            `
        );

        const totalVisits = visits.rows.length;

        const uniqueVisitors = new Set(
            visits.rows.map(row => row.visitor_id)
        ).size;

        const totalSubmissions = answers.rows.length;

        res.json({
            success: true,

            summary: {
                totalVisits,
                uniqueVisitors,
                totalSubmissions
            },

            visits: visits.rows,

            answers: answers.rows
        });

    } catch (error) {
        console.error("DASHBOARD ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Failed to get dashboard data"
        });
    }
});

// =========================
// 404
// =========================

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

// =========================
// START SERVER
// =========================

app.listen(PORT, () => {
    console.log(`SERVER RUNNING: http://localhost:${PORT}`);
});