const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const AuthRoute = require("./routes/AuthRoute.js");
const ProductRoute = require("./routes/ProductRoute");
const AccountRoute = require("./routes/AccountRoute.js");
const TestimoniRoute = require("./routes/TestimoniRoute.js");
const ProfileRoute = require("./routes/ProfileRoute.js");

const path = require("path");
const { sequelize } = require("./models/index.js");
dotenv.config();

const app = express();

const PORT = process.env.PORT || 8000;

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database synchronized successfully.");
  })
  .catch((error) => {
    console.error("Error synchronizing the database:", error);
  });

app.use(cookieParser());
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.use("/api/auth", AuthRoute);
app.use("/api/product", ProductRoute);
app.use("/api/testimoni", TestimoniRoute);
app.use("/api/account", AccountRoute);
app.use("/api/profile", ProfileRoute);

app.listen(PORT, () => {
  console.log(`Server Run in port ${PORT}`);
});
