const express = require("express");
const bodyParser = require("body-parser");
const { db } = require("./firebase");

const app = express();
app.use(bodyParser.json());

// API route to handle job postings
app.post("/api/jobs", async (req, res) => {
  try {
    const { jobTitle, jobDescription } = req.body;

    // Add a new document to the "jobs" collection in Firestore
    const jobsCollection = db.collection("jobs");
    await jobsCollection.add({ jobTitle, jobDescription });

    res.status(201).json({ success: true, message: "Job posted successfully" });
  } catch (error) {
    console.error("Error posting job:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
