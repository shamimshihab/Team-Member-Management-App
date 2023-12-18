require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const teamMembersRoutes = require("./routes/teamMembersRoutes");

const app = express();
app.use(express.json());
mongoose.set("strictQuery", false);
app.use(
  cors({
    origin: "*",
  })
);

mongoose.connect(process.env.MONGODB_URI);

app.use("/team", teamMembersRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
