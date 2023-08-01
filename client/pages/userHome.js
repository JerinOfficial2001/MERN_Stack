import { Button, Container } from "@mui/material";
import { useState } from "react";

export default function UserHome({ userData }) {
  const logout = () => {
    window.localStorage.clear();
    window.location.href = "./login";
    console.log(userData);
  };
  const [note, setNote] = useState("");

  const postData = async () => {
    try {
      await fetch("http://localhost:4000/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          note: note,
          id: userData._id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "ADDED");
        });
    } catch (error) {
      console.log(error);
    }
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
          gap: 5,
        }}
      >
        <input
          placeholder="notes"
          value={note}
          onChange={(e) => {
            setNote(e.target.value);
          }}
        />
        <button onClick={postData}>ok</button>
        <div
          style={{
            background: "white",
            color: "black",
            padding: 10,
            borderRadius: 5,
            minWidth: 400,
          }}
        >
          {/* {id.map((i) => {
            return <h1>{i._id}</h1>;
          })} */}
          Name<h1>{userData.uname}</h1>
          Email<h1>{userData.email}</h1>
          Contact<h1>{userData.phoneNo}</h1>
          <Button onClick={logout} variant="outlined">
            Logout
          </Button>
        </div>
      </Container>
    </>
  );
}
