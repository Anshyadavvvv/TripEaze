import mongoose from "mongoose";
const UserSchema2 = new mongoose.Schema({
    packageName: {
        type: String,
        required: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
        match: /^[6-9]\d{9}$/,
    }
}, { timestamps: true });

const User2 = mongoose.model("User2", UserSchema2);

export default User2;
