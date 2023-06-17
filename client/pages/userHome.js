import { Button, Container } from "@mui/material";

export default function UserHome({userData}) {
    const logout = () => {
        window.localStorage.clear();
        window.location.href = "./login";
        console.log(userData);
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
          <div
            style={{
              background: "white",
              color: "black",
              padding: 10,
              borderRadius: 5,
              minWidth: 400,
            }}
          >
            Name<h1>{userData.uname}</h1>
            Email<h1>{userData.email}</h1>
            Contact<h1>{userData.phoneNo}</h1>
            <Button onClick={logout} variant="outlined">
              Logout
            </Button>
          </div>
        </Container>
      </>
  )
}
