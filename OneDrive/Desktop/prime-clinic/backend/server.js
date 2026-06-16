const express = require("express");
const cors = require("cors");

const app = express();


app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Prime Clinic API Running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});


const leads = [];

app.post("/api/leads", (req, res) => {
  leads.push(req.body);

  console.log(leads);

  res.json({
    success: true,
    message: "Appointment submitted successfully",
  });
});