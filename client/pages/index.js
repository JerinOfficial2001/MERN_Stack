import { useState } from "react";
import Signup from "./signup";
import Login from "./login";

export default function Home() {
  //  const isLoggedIn = window.localStorage.getItem("loggedIn")
 const [swifter, setswifter] = useState(false)
  return (
    <>

      {!swifter?<Login setswifter={setswifter}/>:<Signup setswifter={setswifter}/>}
      
        
    
    </>
  );
}
