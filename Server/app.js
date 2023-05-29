const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs");

const jwt =require('jsonwebtoken')
const JWT_SECRET="egfaGFT2723645896GHHJH[]FUGAYIUYWRETQ904hg4v987y3yv0.,<>jjreoighj>?hdajhf"

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
    const olduser =await User.findOne({ email });
    if (
      olduser
    ) {
      return res.json({ error: "User Exists" });
    }
    if( email !== "" &&
    password !== "" &&
    uname !== "" &&
    phoneNo !== "" ){
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
app.post("/login-user",async(req,res)=>{
  const {email,password}=req.body
  const user =await User.findOne({email})
  if (!user) {
    return res.json({error:'User Not Found'})
  }
  if (await bcrypt.compare(password,user.password)) {
    const token =jwt.sign({email: user.email},JWT_SECRET,{
      expiresIn:10
    })
    
    if (res.status(201)) {
      return res.json({status:"ok",data:token})

    }else{
      return res.json({status:'error'})
    }
  }
  res.json({status:"error",error:'Invalid Password'})
})

//userData
app.post("/userData",async(req,res)=>{
  const {token}=req.body
  try {
    const user=jwt.verify(token,JWT_SECRET)
    const useremail =user.email
    User.findOne({email:useremail}).then((data)=>{
      res.send({status:'ok',data:data})
    })
  } catch (error) {
    
  }
})