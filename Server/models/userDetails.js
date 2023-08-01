const mongoose = require("mongoose");
const UserDetailsScehma = new mongoose.Schema(
  {
    uname: String,
    email: { type: String, unique: true },
    phoneNo: String,
    password: String,
    userType: String,
  },
  {
    collection: "UserInfo",
  }
);
mongoose.model("UserInfo", UserDetailsScehma);

const NotesDetailsScehma = new mongoose.Schema(
  {
    note: String,
    id: String,
  },
  {
    collection: "NotesInfo",
  }
);
mongoose.model("NotesInfo", NotesDetailsScehma);
