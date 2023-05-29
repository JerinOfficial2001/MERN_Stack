import {
    Box,
  Button,
  Container,
  FormControl,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

export default function Signup({setswifter}) {
  const [validator, setvalidator] = useState(false);
  const [inputData, setinputData] = useState({
    email: "",
    password: "",
    uname: "",
    phoneNo: "",
  });
  const { email, password, uname, phoneNo } = inputData;
  const submitHandler = async () => {
    if (email !== "" && password !== "" && uname !== "" && phoneNo !== "") {
      setinputData({
        email: "",
        password: "",
        uname: "",
        phoneNo: "",
      });
      setvalidator(false);
    } else {
      setvalidator(true);
    }
    await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uname,
        email,
        phoneNo,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
      });
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
          width: 390,
          background: "white",
          height: 450,
          borderRadius: 10,
        }}
      >
        <TextField
          variant="outlined"
          sx={{ width: "90%" }}
          type="text"
          value={uname}
          label="Username"
          onChange={(e) => {
            setinputData({ ...inputData, uname: e.target.value });
          }}
        />
        <TextField
          variant="outlined"
          sx={{ width: "90%" }}
          type="email"
          value={email}
          label="Email"
          onChange={(e) => {
            setinputData({ ...inputData, email: e.target.value });
          }}
        />
        <TextField
          variant="outlined"
          sx={{ width: "90%" }}
          type="number"
          value={phoneNo}
          label="Phone Number"
          onChange={(e) => {
            setinputData({ ...inputData, phoneNo: e.target.value });
          }}
        />
        <TextField
          variant="outlined"
          sx={{ width: "90%" }}
          type="password"
          value={password}
          label="Password"
          onChange={(e) => {
            setinputData({ ...inputData, password: e.target.value });
          }}
        />
        {validator && (
          <Typography color="red" fontWeight="bold">
            All fields are mandatory*
          </Typography>
        )}
        <Button
          variant="outlined"
          onClick={() => {
            submitHandler();
          }}
        >
          Create Account
        </Button>
        <Stack direction="row">
         
          <Typography color="black">Already have an account? </Typography>
          <div onClick={()=>{setswifter(false)}} style={{color:'#00b6d8',cursor:'pointer'}} >Log in</div>
        </Stack>
      </FormControl>
      </Container>
    </>
  );
}
