import {
  Box,
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function Admin({ userData }) {
  const [allData, setallDatas] = useState([]);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const everyData = async () => {
    await fetch(`${API_URL}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        setallDatas(data.data);
      });
  };

  useEffect(() => {
    everyData();
  }, []);
  const logout = () => {
    window.localStorage.clear();
    window.location.href = "./login";
  };
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          background: "white",
          borderRadius: 10,
          padding: 5,
          position: "relative",
          color: "black",
        }}
      >
        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
              </TableRow>
            </TableHead>
            {allData.map((i) => {
              return (
                <TableRow key={i._id}>
                  <TableCell>{i.uname}</TableCell>
                  <TableCell>{i.email}</TableCell>
                  <TableCell>{i.phoneNo}</TableCell>
                </TableRow>
              );
            })}
          </Table>
        </TableContainer>
        <div
          style={{
            background: "white",
            color: "black",
            padding: 10,
            borderRadius: 5,
            minWidth: 400,
          }}
        >
          <Button onClick={logout} variant="outlined">
            Logout
          </Button>
        </div>
      </Box>
    </Container>
  );
}
