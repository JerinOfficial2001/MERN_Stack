import { Button, Container, FormControl, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useState } from 'react'

export default function Reset() {
    const router=useRouter()
    const [email, setemail] = useState("")
    const submitHandler=()=>{
        if(email !==""){
            
            console.log(email);
            fetch("http://localhost:4000/forget-password",{
                method:"POST",
                headers:{
                    "content-Type":"application/json",
                    Accept:"application/json"
                },
                body:JSON.stringify({
                    email
                })
            }).then((res)=>res.json()).then((data)=>{
                console.log(data,"userRegister");
                alert(data.status)
            })
                setemail("")
        }
    }
  return (
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
        borderRadius: 10,
        padding:5,
        position:'relative'
      }}
    >
        <h1 style={{color:"black"}}>Forget Password</h1>

      <TextField
        variant="outlined"
        fullWidth
        value={email}
        type="email"
        label="Enter email"
        onChange={(e) => {
         setemail(e.target.value)
        }}
      />
      <Button
            variant="contained"
            fullWidth
            onClick={() => {
             submitHandler()
            }}
          >
            Submit
          </Button>
          <div
              onClick={() => {
                router.push("/")
              }}
              style={{ color: "#00b6d8", cursor: "pointer",position:'absolute',right:40,bottom:20,textDecorationLine:"underline" }}
            >
              Sign Up
            </div>
      </FormControl>
      </Container>
  )
}
