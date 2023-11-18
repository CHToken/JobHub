// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 3001; // You can use any port you prefer
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb+srv://dayojohnson76:p5qKl1g593h8YIcy@cluster0.trk1hkg.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define MongoDB Schema
const userProfileSchema = new mongoose.Schema({
  name: String,
  username: String,
  email: String,
  gender: String,
});

const UserProfile = mongoose.model("UserProfile", userProfileSchema);

// API endpoint to handle profile updates
app.post("/api/updateProfile", async (req, res) => {
  const { user, userProfile } = req.body;

  try {
    // Update the profile in MongoDB
    const updatedProfile = await UserProfile.findOneAndUpdate(
      { user: user },
      { $set: userProfile },
      { new: true }
    );

    // Send the updated profile as the response
    res.json(updatedProfile);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Failed to update profile." });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
