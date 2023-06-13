import axios from "axios";

export const getAllUsers = async () => {
  try {
    const response = await axios.get("http://localhost:5000/register");
    if (response.status === 200) {
      return response.data;
    } else {
      console.log(response);
    }
  } catch (error) {
    throw error;
  }
};

//post
export const createUsers = async(uname, email, phoneNo, password) => {
  try {
    await fetch("http://localhost:5000/register",
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

//get
export const loginUser = (email, password) => {
  try {
    fetch("http://localhost:5000/login-user", {
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
