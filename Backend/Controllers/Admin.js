import express from "express";
import User from "../Models/UserSchema.js";
import User2 from "../Models/UserSchema2.js";
import jwt from 'jsonwebtoken';
const adminpanel = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the required fields",
      });
    }
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      return res.status(200).json({
        success: true,
        message: "Admin login successful",
        token : token,
      });
    }
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  } catch (error) {
    console.log("Error occured", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const getEnquiry = async (req, res) => {
  try {
    const enquiries = await User.find().sort({
      createdAt: -1,
    });
    return res.status(200).json({ enquiries });
  } catch (error) {
    console.error("Failed to fetch enquiries:", error);
    return res.status(500).json({ error: "Unable to fetch enquiries" });
  }
};

const getPhoneDownloads = async (req, res) => {
  try {
    const phoneDownloads = await User2.find().sort({ createdAt: -1 }).lean();
    return res.status(200).json({ phoneDownloads });
  } catch (error) {
    console.error("Failed to fetch phone downloads:", error);
    return res.status(500).json({ error: "Unable to fetch phone downloads" });
  }
};

const deleteEnquiry = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({
      message: "Enquiry deleted successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "error deleting enquiry", data: error });
  }
};

export { adminpanel, getEnquiry, getPhoneDownloads, deleteEnquiry };
