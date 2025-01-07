import { model, Schema } from "mongoose";
import bcryptjs from "bcryptjs";
import crypto from "crypto";

const userSchema = new Schema({
  googleId: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    select: false,
  },
  firstName: String,
  lastName: String,
  profilePicture: String,
  lastActive: [Date],
  phoneNumber: String,
  isVerified: Boolean,

  role: {
    type: String,
    enum: ["admin", "designer", "associate", "client"],
    default: "client",
  },
  status: {
    type: String,
    enum: ["active", "inactive", "suspended"],
  },
  recent_works: [String],
  average_rating: Number,
  subline: String,
  country: String,
  laguages_known: [String],
  proffesional_info: {
    type: Schema.Types.ObjectId,
    ref: "ProffesionalInfo",
  },
  location:{Number},
  devices: [
    {
      deviceId: String,
      deviceName: String,
    },
  ],
  maxDevices: { type: Number, default: 3 },

  subscription: {
    plan: {
      type: String,
      enum: ["free", "monthly", "yearly"],
      default: "free",
    },
    active: { type: Boolean, default: false },
    renewalDate: { type: Date, default: null },
    lastPaymentDate: { type: Date, default: null },
  },

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

  // console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = model("user", userSchema);

export default User;
