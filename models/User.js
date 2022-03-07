const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.pre("save", function (next) {
  const user = this;

  bcrypt.hash(user.password, 10, (err, hashedPassword) => {
    if (err) throw err;
    user.password = hashedPassword;
    next();
  });
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
