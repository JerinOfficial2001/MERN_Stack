import { Box, Stack, Typography } from "@mui/material";
import React from "react";

export default function Contents() {
  return (
    <>
      <Stack
        sx={{
          width: 350,
          position: "absolute",
          right:100
        }}
      >
        <Box sx={{
             background: "white",
             height: 100,
             display:'flex',
             alignItems:'center',
             justifyContent:'center',
             flexDirection:'column',
             color:'black',
             borderRadius:5
        }}>
            <Typography >Gmail</Typography>
            <Typography >Gmail</Typography>
            <Typography >Gmail</Typography>

        </Box>
      </Stack>
    </>
  );
}
