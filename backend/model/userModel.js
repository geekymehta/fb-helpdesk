const mongoose = require("mongoose");
const validator = require("validator");
// const { uniqueValidator } = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    passwordHash: {
      type: String,
      // required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate: {
        validator: function (value) {
          return validator.isEmail(value);
        },
        message: "Invalid email address",
      },
    },
  },
  {
    timestamps: true,
  }
);

// userSchema.plugin(uniqueValidator);
const User = mongoose.model("User", userSchema);

module.exports = User;
