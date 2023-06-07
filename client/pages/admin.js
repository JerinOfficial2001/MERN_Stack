import { Box, Button, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

export default function admin() {
  const [allDatas, setallDatas] = useState([])
    fetch("http://localhost:5000/admin",{
        method:"GET"
    }).then((res)=>{
        res.json
    }).then((data)=>{
        setallDatas(data)
    })
    // useEffect(() => {
    
    
    //   return () => {
    //     second
    //   }
    // }, [])
    
 
    const [initialRenderComplete, setInitialRenderComplete] = useState(false);

	// This useEffect will only run once, during the first render
	useEffect(() => {
		// Updating a state causes a re-render
		setInitialRenderComplete(true);
	}, []);

	// initialRenderComplete will be false on the first render and true on all following renders
	if (!initialRenderComplete) {
		// Returning null will prevent the component from rendering, so the content will simply be missing from
		// the server HTML and also wont render during the first client-side render.
		return null;
	} else {
		const date = new Date();

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
        padding:5,
        position:'relative',
        color:'black'
      }}
    >
        <TableContainer>
            <Table  sx={{ minWidth: 650 }} >
                <TableHead>
        <TableRow >
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
        </TableRow>
        </TableHead>
        <TableRow >
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
        </TableRow>
        
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
        )
	}
}