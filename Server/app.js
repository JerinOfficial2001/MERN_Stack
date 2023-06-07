const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

const jwt = require("jsonwebtoken");
const JWT_SECRET =
  "egfaGFT2723645896GHHJH[]FUGAYIUYWRETQ904hg4v987y3yv0.,<>jjreoighj>?hdajhf";

const mongoURL =
  "mongodb+srv://jerin_25_01:jerin2001@cluster0.c0nwait.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("connected to database");
  })
  .catch((e) => console.log(e));

app.listen(5000, () => {
  console.log("ready steady GO");
});

// //edit
// app.put("/post/:id", (req, res) => {
//   const id = req.params.id;
//   const post = data.find((i) => i.id === id);
//   const index = data.findIndex(post);
//   data.splice(index, 0, req.body);
//   res.json(data);
// });

//mongoose
require("./userDetails");

const User = mongoose.model("UserInfo");
app.post("/register", async (req, res) => {
  const { uname, email, phoneNo, password } = req.body;
  const encryptedpassword = await bcrypt.hash(password, 10);
  try {
    const olduser = await User.findOne({ email });

    if (olduser) {
      return res.json({ error: "User Exists" });
    }
    if (email !== "" && password !== "" && uname !== "" && phoneNo !== "") {
      await User.create({
        uname,
        email,
        phoneNo,
        password: encryptedpassword,
      });
      console.log(req.body);
      res.send(req.body);
    } else {
      res.sendStatus(422, {
        message: "Req fie",
      });
    }
  } catch (error) {
    res.send({ status: "error" });
  }
});

//login
app.post("/login-user", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ error: "User Not Found" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email: user.email }, JWT_SECRET, {
      expiresIn: 10,
    });

    if (res.status(201)) {
      return res.json({ status: "ok", data: token });
    } else {
      return res.json({ status: "error" });
    }
  }
  res.json({ status: "error", error: "Invalid Password" });
});

//userData
app.post("/userData", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET, (err, res) => {
      if (err) {
        return "token expired";
      }
      return res;
    });
    console.log(user);
    if (user == "token expired") {
      return res.send({ status: "error", data: "token expired" });
    }
    const useremail = user.email;
    User.findOne({ email: useremail }).then((data) => {
      res.send({ status: "ok", data: data });
    });
  } catch (error) {
    console.log(error);
  }
});

//reset

app.post("/forget-password", async (req, res) => {
  const { email } = req.body;
  try {
    const olduser = await User.findOne({ email });

    if (!olduser) {
      return res.json({ status: "User Not Exists!!" });
    }
    const secret = JWT_SECRET + olduser.password;
    const token = jwt.sign({ email: olduser.email, id: olduser._id }, secret, {
      expiresIn: "5m",
    });
    const link = `http://localhost:5000/reset-password/${olduser._id}/${token}`;
    console.log(link);
  } catch (error) {
    console.log(error);
  }
});
//reset
app.get("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  console.log(req.params);
  const olduser = await User.findOne({ _id: id });

  if (!olduser) {
    return res.json({ status: "User Not Exists!!" });
  }
  const secret = JWT_SECRET + olduser.password;
  try {
    const verify = jwt.verify(token, secret);
    res.render("index", { email: verify.email });
    res.send("verified");
  } catch (error) {
    res.send("not verified");
  }
});

app.post("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  console.log(req.params);
  const olduser = await User.findOne({ _id: id });

  if (!olduser) {
    return res.json({ status: "User Not Exists!!" });
  }
  const secret = JWT_SECRET + olduser.password;
  try {
    const verify = jwt.verify(token, secret);
    const encryptedpassword = await bcrypt.hash(password, 10);
    await User.updateOne(
      { _id: id },
      {
        $set: {
          password: encryptedpassword,
        },
      }
    );
    // res.render("index",{email:verify.email})
    res.json({ status: "password updated" });
  } catch (error) {
    res.json({ status: "password not updated" });
  }
});

// app.get("getAllUsers",async(req,res)=>{
// try {
//   const allUsers =await User.findOne({})
// res.send({status:"ok",data:allUsers})
// } catch (error) {
//   console.log(error);
// }
// })
