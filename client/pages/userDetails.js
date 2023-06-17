import { Button, Container } from "@mui/material";
import { useEffect, useState } from "react";
import UserHome from "./userHome";
import Admin from "./admin";

export default function UserDetails() {
  const [userData, setuserData] = useState("")
  const [admin, setadmin] = useState(false)
const userInfo =async()=>{
  await fetch("http://localhost:4000/userData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept:"application/json"
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        if (data.data.userType=="Admin") {
          setadmin(true)
        }
        setuserData(data.data);
        if (data.data == "token expired") {
          alert('token expired login again')
          window.localStorage.clear();
    window.location.href = "./login";
        }
      });
  }

useEffect(() => {
  userInfo()
}, [])

    return (
      admin ?<Admin userData={userData}/>:<UserHome userData={userData}/>
    );
  }




// export default function userDetails()  {
//   const [userData, setuserData] = useState([])
//   useEffect(() => {
//     fetch("http://localhost:5000/userData", {
//        method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         token: window.localStorage.getItem("token"),
//       }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data, "userData");
//        setuserData(data)
//         if (data.data == "token expired") {
//           alert('token expired login again')
//           window.localStorage.clear();
//     window.location.href = "./login";
//         }
//       });
//   }, [])

//  const logout = () => {
//     window.localStorage.clear();
//     window.location.href = "./login";
//   };
//   const {data}=userData
//   {
//     return (
//       <>
//         <Container
//           maxWidth="xl"
//           sx={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             height: "100vh",
//             width: "100%",
//             gap: 5,
//           }}
//         >
         
//           {/* <div
//             style={{
//               background: "white",
//               color: "black",
//               padding: 10,
//               borderRadius: 5,
//               minWidth: 400,
//             }}
//           >
//             Name<h1>{data.uname}</h1>
//             Email<h1>{data.email}</h1>
//             Contact<h1>{data.phoneNo}</h1>
//             <Button onClick={logout} variant="outlined">
//               Logout
//             </Button>
//           </div> */}
//         </Container>
//       </>
//     );
//   }
// }
