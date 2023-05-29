import {
  
  Button,
  Container,
  FormControl,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

export default function Login({ setswifter }) {
  const [validator, setvalidator] = useState(false);
  const [inputData, setinputData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputData;
  const submitHandler = async () => {
    if (email !== "" && password !== "") {
      setinputData({
        email: "",
        password: "",
      });
      setvalidator(false);
    } else {
      setvalidator(true);
    }
    await fetch("http://localhost:5000/login-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        if (data.status == "ok") {
          alert("login sucess");
          window.localStorage.setItem("token", data.data);
          window.localStorage.setItem("loggedIn", true);
          window.location.href = "./userDetails";
        }
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
            Login
          </Button>
          <Stack direction="row">
            <Typography color="black">Don't have an account? </Typography>
            <div
              onClick={() => {
                setswifter(true);
              }}
              style={{ color: "#00b6d8", cursor: "pointer" }}
            >
              Sign Up
            </div>
          </Stack>
        </FormControl>
      </Container>
    </>
  );
}
