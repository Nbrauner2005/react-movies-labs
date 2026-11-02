import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate, useLocation } from "react-router";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const SiteHeader = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const navigate = useNavigate();
  const location = useLocation();

  const menuOptions = [
    { label: "Home", path: "/" },
    { label: "Favorites", path: "/movies/favorites" },
    { label: "Watchlist", path: "/movies/watchlist" },
    { label: "Upcoming Movies", path: "/movies/upcoming" },
    { label: "Popular Movies", path: "/movies/popular" },
    { label: "Top Rated Movies", path: "/movies/top-rated" },
    { label: "Now Playing", path: "/movies/now-playing" },
  ];

  const handleMenuSelect = (pageURL) => {
    setAnchorEl(null);
    navigate(pageURL);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <AppBar
       position="fixed" 
       sx={{
        backgroundColor: "#1e1e2f",
        boxShadow: "0 3px 12px rgba(0, 0, 0, 0.2)",
       }}
       >
        <Toolbar>
          <Typography
           variant="h5"
            sx={{ 
              fontWeight: 700,
              letterSpacing: 0.5,
              flexGrow: 1,
              whiteSpace: "nowrap",
              }}
              >
            TMDB Client
          </Typography>

          {isMobile ? (
            <>
              <IconButton
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>

              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={() => setAnchorEl(null)}
              >
                {menuOptions.map((opt) => (
                  <MenuItem
                    key={opt.label}
                    onClick={() => handleMenuSelect(opt.path)}
                  >
                    {opt.label}
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <>
              {menuOptions.map((opt) => {
  const isActive = location.pathname === opt.path;

  return (
    <Button
      key={opt.label}
      color="inherit"
      onClick={() => handleMenuSelect(opt.path)}
      sx={{
        fontSize: "0.8rem",
        fontWeight: isActive ? 700 : 500,
        textTransform: "none",
        whiteSpace: "nowrap",
        borderRadius: 2,
        mx: 0.3,
        px: 1.5,
        backgroundColor: isActive
          ? "rgba(255, 255, 255, 0.15)"
          : "transparent",
        "&:hover": {
          backgroundColor: "rgba(255, 255, 255, 0.12)",
        },
      }}
    >
      {opt.label}
    </Button>
  );
})}
            </>
          )}
        </Toolbar>
      </AppBar>

      <Offset />
    </>
  );
};

export default SiteHeader;
