import express from "express";
import { getEnquiry, deleteEnquiry, adminpanel } from "../Controllers/Admin.js";
const router = express.Router();
import authMiddleware from "../Middleware/authmiddleware.js";

router.post("/", adminpanel);
router.get("/enquiries", authMiddleware, getEnquiry);

router.delete("/enquiries/:id", authMiddleware, deleteEnquiry);
export default router;
