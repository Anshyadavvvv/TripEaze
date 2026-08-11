import express from "express";
import User from "../Models/UserSchema.js";
import bcrypt from "bcrypt";

const submitEnquiry = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      packages: packageName,
      address,
      numoftraveller,
      phonenumber,
      query,
    } = req.body || {};
    console.log(req.body);

    if (
      !name ||
      !email ||
      !password ||
      !packageName ||
      !address ||
      !numoftraveller ||
      !phonenumber ||
      !query
    ) {
      return res
        .status(400)
        .json({ success: false, message: "please fill all the fields" });
    }

    const existinguser = await User.findOne({ email });
    if (existinguser) {
      return res.status(409).json({
        success: false,
        message:
          "You have already submitted your enquiry , please wait we will contact you shortly",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password , salt);
    const user = await User.create({
      name,
      email,
      password:hashedpassword,
      packages: packageName,
      address,
      numoftraveller,
      phonenumber,
      query,
    });

    return res.json({ success: true, message: "User Saved Successfully" , data: user });
  } catch (error) {
    console.error("submitEnquiry error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
export default submitEnquiry;
