import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useContext, useState } from "react";
import logo from "../assets/images/hungry-hub-logo.png";
import PersonIcon from "@mui/icons-material/Person";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const pages = [
  { name: "Restaurants", url: "/restaurants" },
  { name: "Deliverer", url: "/delieverer" },
];
const customerSettings = [
  { name: "Profile", url: "/hungry-hub/edit-profile" },
  { name: "Password", url: "/hungry-hub/edit-password" },
  { name: "My Adresses", url: "/hungry-hub/user-adresses" },
];

const restaurantOwnerSettings = [
  { name: "Profile", url: "/hungry-hub/edit-profile" },
  { name: "Password", url: "/hungry-hub/edit-password" },
  { name: "My Restaurants", url: "/hungry-hub/user-restaurants" },
];

const delivererSettings = [
  { name: "Profile", url: "/hungry-hub/edit-profile" },
  { name: "Password", url: "/hungry-hub/edit-password" },
  { name: "My Delivers", url: "/hungry-hub/user-delivers" },
];

export default function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();
  const customerRoleId = "65de3d32f96753f2845107c5";
  const restaurantRoleId = "65de3d4bf96753f2845107c6";
  const delivererRoleId = "65e48948f97465dc675505a7";

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#EF233C" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img className="Logo" src={logo} />
          <Link to={"/hungry-hub"}>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "white",
                textDecoration: "none",
              }}
            >
              HUNGRY HUB
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map(({ name, url }) => (
                <MenuItem key={name} onClick={handleCloseNavMenu}>
                  <Link to={url}>
                    <Typography textAlign="center">{name}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            HUNGRY HUB
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map(({ name, url }) => (
              <Link key={name} to={url}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {name}
                </Button>
              </Link>
            ))}
          </Box>
          {isLoggedIn && user.roleId === customerRoleId && (
            <Box sx={{ display: "flex", gap: 2 }}>
              <Typography textAlign="center">
                Welcome, {user.fullName.split(" ")[0]}
              </Typography>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <PersonIcon alt="Profile" sx={{ color: "white" }} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {customerSettings.map(({ name, url }) => (
                    <MenuItem key={name} onClick={handleCloseUserMenu}>
                      <Link to={`${url}/${user._id}`}>
                        <Typography textAlign="center">{name}</Typography>
                      </Link>
                    </MenuItem>
                  ))}
                  <MenuItem key={"logOut"} onClick={handleCloseUserMenu}>
                    <Button onClick={logOutUser} sx={{ color: "gray" }}>
                      Logout
                    </Button>
                  </MenuItem>
                </Menu>
              </Box>
            </Box>
          )}

          {isLoggedIn && user.roleId === restaurantRoleId && (
            <Box sx={{ display: "flex", gap: 2 }}>
              <Typography textAlign="center">
                Welcome, {user.fullName.split(" ")[0]}
              </Typography>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <PersonIcon alt="Profile" sx={{ color: "white" }} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {restaurantOwnerSettings.map(({ name, url }) => (
                    <MenuItem key={name} onClick={handleCloseUserMenu}>
                      <Link to={`${url}/${user._id}`}>
                        <Typography textAlign="center">{name}</Typography>
                      </Link>
                    </MenuItem>
                  ))}
                  <MenuItem key={"logOut"} onClick={handleCloseUserMenu}>
                    <Button onClick={logOutUser} sx={{ color: "gray" }}>
                      Logout
                    </Button>
                  </MenuItem>
                </Menu>
              </Box>
            </Box>
          )}

          {isLoggedIn && user.roleId === delivererRoleId && (
            <Box sx={{ display: "flex", gap: 2 }}>
              <Typography textAlign="center">
                Welcome, {user.fullName.split(" ")[0]}
              </Typography>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <PersonIcon alt="Profile" sx={{ color: "white" }} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {delivererSettings.map(({ name, url }) => (
                    <MenuItem key={name} onClick={handleCloseUserMenu}>
                      <Link to={`${url}/${user._id}`}>
                        <Typography textAlign="center">{name}</Typography>
                      </Link>
                    </MenuItem>
                  ))}
                  <MenuItem key={"logOut"} onClick={handleCloseUserMenu}>
                    <Button onClick={logOutUser} sx={{ color: "gray" }}>
                      Logout
                    </Button>
                  </MenuItem>
                </Menu>
              </Box>
            </Box>
          )}

          {!isLoggedIn && (
            <Box className="NavbarButtons">
              <Button
                sx={{ backgroundColor: "white", color: "#EF233C" }}
                variant="contained"
                color="error"
                onClick={() => navigate("/hungry-hub/login")}
              >
                LOGIN
              </Button>
              <Button
                sx={{ backgroundColor: "#2B2D42", color: "white" }}
                variant="contained"
                color="error"
                onClick={() => navigate(`/hungry-hub/signup/${customerRoleId}`)}
              >
                SIGN UP
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
