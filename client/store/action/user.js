import { toast } from "react-hot-toast";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

//signup
export const createUsers = async (
  uname,
  email,
  phoneNo,
  password,
  userType
) => {
  try {
    await fetch(API_URL + "/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uname,
        email,
        phoneNo,
        password,
        userType,
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
export const loginUser = async (email, password) => {
  try {
    await fetch("http://localhost:4000/login_user", {
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
          toast.success("Successfully Logged In");
          window.localStorage.setItem("token", data.data);
          window.localStorage.setItem("loggedIn", true);
          window.location.href = "./userDetails";
        }
      });
  } catch (error) {
    console.log(error);
  }
};
