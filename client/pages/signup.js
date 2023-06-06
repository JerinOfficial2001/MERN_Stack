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
import app from "../components/firebase_config";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

export default function Signup({ setswifter }) {
  const [verifyButton, setverifyButton] = useState(false)
  const [verifyOtp, setverifyOtp] = useState(false)

  const [validator, setvalidator] = useState(false);
  const [inputData, setinputData] = useState({
    email: "",
    password: "",
    uname: "",
    phoneNo: "",
        otp:''
  });
  const { email, password, uname, phoneNo,otp} = inputData;
  const submitHandler = async () => {
    if (email !== "" && password !== "" && uname !== "" && phoneNo !== "") {
      setinputData({
        email: "",
        password: "",
        uname: "",
        phoneNo: "",
        otp:""
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

  const auth = getAuth();
  const onCatchVerify = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // ...
        },
       
      },
      auth
    );
  };

  const onSignInSubmit = () => {
    onCatchVerify()
    const phoneNumber = "+91" + phoneNo;
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        alert("otp sended")
        setverifyOtp(true)
        setverifyButton(false)
        // ...
      })
      .catch((error) => {
        // Error; SMS not sent
        // ...
      });
  };
  const verifyCode =()=>{
   
    window.confirmationResult.confirm(otp).then((result) => {
      // User signed in successfully.
      const user = result.user;
      console.log(user );
      alert("verification Done")
      setverifyOtp(false)
      // ...
    }).catch((error) => {
      // User couldn't sign in (bad verification code?)
      // ...
      alert('Invalid otp')
    });
    
      }
  const changeMobile =(e)=>{
    setinputData({ ...inputData, phoneNo: e.target.value })
      if (phoneNo.length == 9) {
       
          setverifyButton(true)
      
      }else{
        setverifyButton(false)
      }
   
  }
  
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
           padding:3,
            borderRadius: 10,
          }}
        >
          <div id="recaptcha-container"></div>
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
              changeMobile(e)
            }}
          />
         {verifyButton? <TextField onClick={onSignInSubmit} sx={{ width: "90%" }}  type="button" value="verify" /> : null}
          <TextField
            variant="outlined"
            sx={{ width: "90%" }}
            type="number"
            value={otp}
            label="OTP"
            onChange={(e) => {
              setinputData({ ...inputData, otp: e.target.value });
            }}
          />
          {verifyOtp? <TextField onClick={verifyCode} sx={{ width: "90%" }}  type="button" value="OTP" />:null}

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
            <div
              onClick={() => {
                setswifter(false);
              }}
              style={{ color: "#00b6d8", cursor: "pointer" }}
            >
              Log in
            </div>
          </Stack>
        </FormControl>
      </Container>
    </>
  );
}
