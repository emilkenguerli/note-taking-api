const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    deletedAt: {
      type: Date,
      default: null,
      validate: {
        validator: function (value) {
          // Allow null values for deletedAt
          return value === null || value instanceof Date;
        },
        message: "deletedAt must be a Date or null",
      },
    },
  },
  {
    timestamps: true,
  }
);

// Hash the plain text password before saving
userSchema.pre("save", async function (next) {
  const user = this;
  console.log("yo");
  console.log(user);
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  console.log("hello");
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;