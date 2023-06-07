import { useState } from "react";
import Signup from "./signup";
import Login from "./login";
import userDetails from "./userDetails";

export default function Home() {
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  const [swifter, setSwifter] = useState(false);
  return (
    <>
      {isLoggedIn == "true" ? (
        <userDetails />
      ) : !swifter ? (
        <Login setSwifter={setSwifter} />
      ) : (
        <Signup setSwifter={setSwifter} />
      )}
    </>
  );
}
