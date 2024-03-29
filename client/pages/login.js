import { loginUser } from "@/store/action/user";
import {
  Button,
  Container,
  FormControl,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

export default function Login({ setSwifter }) {
  const router = useRouter();

  const [validator, setvalidator] = useState(false);
  const [inputData, setinputData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputData;
  const submitHandler = () => {
    if (email !== "" && password !== "") {
      setinputData({
        email: "",
        password: "",
      });
      setvalidator(false);
    } else {
      setvalidator(true);
    }

    loginUser(email, password);
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
        <Toaster position="top-center" reverseOrder={false} />
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
          <h1 className="text-bl">jerin</h1>
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
                router.push("/signup");
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
