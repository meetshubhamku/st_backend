const express = require("express");
const config = require("./config.json");
const app = express();
const http = require("http");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const serviceCategoryRoutes = require("./routes/serviceCategoryRoutes");
const offerRoutes = require("./routes/offerRoutes");
const appointmentRoutes = require("./routes/appointmentRoute");
const paymentRoutes = require("./routes/paymentRoutes");

const port = config.default.port;
const { sequelize } = require("./database/Database");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

//middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", employeeRoutes);
app.use("/api", serviceRoutes);
app.use("/api", serviceCategoryRoutes);
app.use("/api", offerRoutes);
app.use("/api", appointmentRoutes);
app.use("/api", paymentRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!!!");
});

io.on("connection", (socket) => {
  console.log("a user connected");
});

server.listen(port, () => {
  console.log(`Listening on port : ${port}`);
});

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
//   //   { force: true }
//   sequelize.authenticate().then((res) => {
//     console.log("Database connected", res);
//   });
// });
