const express = require("express");
const cors = require("cors");
const path = require('path');
require("dotenv").config();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
   credentials: true,
   origin: "http://localhost:5173"
}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/auth", authRoutes);
app.use("/events", eventRoutes);
app.use("/tickets", ticketRoutes);

app.listen(PORT, () => {
   console.log(`Server Starting on http://localhost:${PORT}`);
   mongoose.connect(process.env.MONGO_URL)
      .then(() => {
         console.log('MONGODB Connected');
      })
      .catch((err) => {
         console.log('MONGODB Connection Error:', err);
      });
});
