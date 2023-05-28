import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { Button, Container, FormControl, TextField, Typography } from "@mui/material";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [validator, setvalidator] = useState(false)
  const [inputData, setinputData] = useState({
    email: "",
    password: "",
    uname: "",
    phoneNo: "",
  });
  const { email, password, uname, phoneNo } = inputData;
  const submitHandler = async() => {
    if (email !== "" && password !== "" && uname !== "" && phoneNo !== "") {
      setinputData({
        email: "",
        password: "",
        uname: "",
        phoneNo: "",
      });
      setvalidator(false)

    } else {
      setvalidator(true)
    }
   await fetch("http://localhost:5000/register",{
      method:"post",
      crossDomain:true,
      headers:{
        "Content-Type":"application/json",
        Accept:"application/json",
        "Access-Control-Allow-Origin":"*"
      },
      body:JSON.stringify({
        uname,
        email,
        phoneNo,
        password
      })
    }).then((res)=>res.json()).then((data)=>{
      console.log(data,"userRegister");
    })
  };
  return (
    <>
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100%",
        }}
      >
        <FormControl
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: 1,
            width:390,
            background:'white',
            height:450,
            borderRadius:10
          }}
        >
          <TextField
            variant="outlined"
            sx={{width:"90%"}}
            type="text"
            value={uname}
            label="Username"
            onChange={(e) => {
              setinputData({ ...inputData, uname: e.target.value });
            }}
            
          />
          <TextField
            variant="outlined"
            sx={{ width:"90%" }}
            type="email"
            value={email}
            label="Email"
            onChange={(e) => {
              setinputData({ ...inputData, email: e.target.value });
            }}
          />
          <TextField
            variant="outlined"
            sx={{width:"90%" }}
            type="number"
            value={phoneNo}
            label="Phone Number"
            onChange={(e) => {
              setinputData({ ...inputData, phoneNo: e.target.value });
            }}
          />
          <TextField
            variant="outlined"
            sx={{ width:"90%" }}
            type="password"
            value={password}
            label="Password"
            onChange={(e) => {
              setinputData({ ...inputData, password: e.target.value });
            }}
          />
          {
            validator && <Typography color="red" fontWeight="bold">
              All fields are mandatory*
            </Typography>
          }
          <Button
          variant="outlined"
          sx={{marginTop:5}}
            onClick={() => {
              submitHandler();
            }}
          >
            Create Account
          </Button>
        </FormControl>
      </Container>
    </>
  );
}
