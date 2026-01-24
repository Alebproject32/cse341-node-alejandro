const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true, //Not allow required
      match: [/.+@.+\..+/, "Please fill a valid email address"],
    },
    favoriteColor: {
      type: String,
      default: "n/a",
    },
    birthday: {
      type: String,
    },
  },
  { versionKey: false },
); //This take off "__v" in Mongoose

module.exports = mongoose.model("Contact", contactSchema);
