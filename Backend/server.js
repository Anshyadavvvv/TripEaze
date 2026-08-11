import express from "express";
import cors from "cors";
import connectDB from "./Config/mongoDB.js";
import "dotenv/config";
import submitEnquiry from "./Controllers/userdata.js";
import router from "./Routes/admin.routes.js";
import jwt from 'jsonwebtoken';

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

connectDB();
app.get("/", (req, res) => {
  res.json({ message: "TripEaze backend is running" });
});

app.use("/utkarshadmin", router);
app.post("/packages/:packageName/enquiry", submitEnquiry);
//app.use("/utkarshadmin/adminpanel", router);
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
