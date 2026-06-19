const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
res.send("Prime Clinic API Running");
});

// Check Database Connection
pool.query("SELECT NOW()")
.then((result) => {
console.log("✅ Database Connected");
console.log(result.rows[0]);
})
.catch((err) => {
console.error("❌ Database Connection Error");
console.error(err);
});

// Create Appointment
app.post("/api/leads", async (req, res) => {
console.log("BODY RECEIVED:", req.body);

try {
const {
name,
phone,
email,
doctor,
date,
time,
reason,
} = req.body;

```
const result = await pool.query(
  const result = await pool.query(
  "INSERT INTO appointments (name, phone, email, doctor, appointment_date, appointment_time, reason) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *",
  [name, phone, email, doctor, date, time, reason]
);

console.log("✅ Appointment Saved");

res.json({
  success: true,
  message: "Appointment saved successfully",
  data: result.rows[0],
});
```

} catch (error) {
  console.error("❌ Insert Error:", error);

  res.status(500).json({
    success: false,
    error: error.message,
  });
}
});

// Get All Appointments
app.get("/api/leads", async (req, res) => {
try {
const result = await pool.query(
"SELECT * FROM appointments ORDER BY created_at DESC"
);

```
res.json(result.rows);
```

} catch (error) {
console.error("❌ Fetch Error:", error);

```
res.status(500).json({
  success: false,
  error: error.message,
});
```

}
});

// Create Table
app.get("/create-table", async (req, res) => {
try {
await pool.query(`       CREATE TABLE IF NOT EXISTS appointments (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        phone VARCHAR(20),
        email VARCHAR(100),
        doctor VARCHAR(100),
        appointment_date DATE,
        appointment_time VARCHAR(20),
        reason TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

```
res.send("Appointments table created successfully!");
```

} catch (error) {
console.error(error);
res.status(500).send(error.message);
}
});

// Start Server
app.listen(process.env.PORT || 5000, () => {
console.log("🚀 Server running");
});
