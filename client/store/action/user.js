import axios from "axios";
import { Component } from "react";


//userDetail



//signup
export const createUsers = async(uname, email, phoneNo, password) => {
  try {
    await fetch("https://mern-api-urxj.onrender.com/register",
    {
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
  } catch (error) {
    console.log(error);
  }
};

//login
export const loginUser = (email, password) => {
  try {
    fetch("https://mern-api-urxj.onrender.com/login-user", {
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
  } catch (error) {
    console.log(error);
  }
};
