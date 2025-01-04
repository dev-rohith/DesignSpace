import { model, Schema } from "mongoose";
import bcryptjs from "bcryptjs";

const userSchema = new Schema({
  googleId: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  passoword: String,
  firstName: String,
  lastName: String,
  profilePicture: String,
  lastActive: Date,
  phoneNumber: String,
  isVerified: Boolean,

  role: {
    type: String,
    enum: ["super-admin", "designer", "space-executer", "client"],
  },
  status: {
    type: String,
    enum: ["active", "inactive", "suspended"],
  },

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
  passwordChangedAt: Date,
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

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

//mongoose userdefined methods

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcryptjs.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
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
