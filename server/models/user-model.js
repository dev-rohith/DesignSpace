import { model, Schema } from "mongoose";
import bcryptjs from "bcryptjs";
import crypto from "crypto";

const userSchema = new Schema({
  // Basic user information
  googleId: String,
  email: { type: String, unique: true },
  password: { type: String, select: false },
  firstName: String,
  lastName: String,
  profilePicture: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  },
  isVerified: Boolean,

  // Role and status
  role: {
    type: String,
    enum: ["admin", "designer", "associate", "client"],
    default: "client",
  },
  status: {
    type: String,
    enum: ["active", "inactive", "suspended"],
    default: "active",
  },

  // Basic profile info
  lastLoginOn: [Date],

  // Device management
  devices: [
    {
      deviceId: String,
      deviceName: String,
    },
  ],
  maxDevices: { type: Number, default: 3 },

  // Subscription
  subscription: {
    plan: {
      type: String,
      enum: ["free", "monthly", "yearly"],
      default: "free",
    },
    active: { type: Boolean, default: false },
    expiryDate: Date,
    lastPaymentDate: Date,
  },

  // Security
  otp: Number,
  otp_chances: {
    type: Number,
    default: 3,
    max: 3,
    min: 1,
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
});

//pre hooks

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcryptjs.genSalt();
  this.password = await bcryptjs.hash(this.password, salt);
  next();
});

//mongoose userdefined methods

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcryptjs.compare(candidatePassword, userPassword);
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = model("User", userSchema);

export default User;
