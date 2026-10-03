import express from "express";
import { getEnquiry, getPhoneDownloads, deleteEnquiry, adminpanel } from "../Controllers/Admin.js";
const router = express.Router();
import authMiddleware from "../Middleware/authmiddleware.js";

router.post("/", adminpanel);
router.get("/enquiries", authMiddleware, getEnquiry);
router.get("/phone-downloads", authMiddleware, getPhoneDownloads);

router.delete("/enquiries/:id", authMiddleware, deleteEnquiry);
export default router;
