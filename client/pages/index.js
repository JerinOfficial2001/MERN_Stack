import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useState } from "react";
import Signup from "./signup";
import Login from "./login";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  //  const isLoggedIn = window.localStorage.getItem("loggedIn")
 const [swifter, setswifter] = useState(false)
  return (
    <>

      {!swifter?<Login setswifter={setswifter}/>:<Signup setswifter={setswifter}/>}
      
        
    
    </>
  );
}
