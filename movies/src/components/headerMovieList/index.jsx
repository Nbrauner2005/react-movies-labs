import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router";

const Header = (props ) => {
const title = props.title
const navigate = useNavigate();

  
return (
  <Paper
    component="div"
    elevation={0}
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "#1e1e2f",
      color: "#ffffff",
      borderRadius: 3,
      padding: { xs: 1.5, md: 2.5 },
      margin: 2,
      marginBottom: 3,
      border: "1px solid #383850",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.12)",
    }}
  >
    <IconButton
      aria-label="go back"
      onClick={() => navigate(-1)}
      sx={{
        color: "#ffffff",
        backgroundColor: "#343449",
        "&:hover": {
          backgroundColor: "#50506a",
        },
      }}
    >
      <ArrowBackIcon />
    </IconButton>

    <Typography
      variant="h4"
      component="h1"
      sx={{
        fontWeight: 700,
        fontSize: { xs: "1.4rem", md: "2rem" },
        textAlign: "center",
        flex: 1,
        mx: 2,
      }}
    >
      {title}
    </Typography>

    <IconButton
      aria-label="go forward"
      onClick={() => navigate(1)}
      sx={{
        color: "#ffffff",
        backgroundColor: "#343449",
        "&:hover": {
          backgroundColor: "#50506a",
        },
      }}
    >
      <ArrowForwardIcon />
    </IconButton>
  </Paper>
);

};

export default Header;
