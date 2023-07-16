import { AppBar, Icon, IconButton, Link, Toolbar, Typography } from "@mui/material";
import { AuthContext } from "../auth/AuthRequired";
import { useContext } from "react";
import { Person } from "@mui/icons-material";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";


const LayoutNavBar = () => {

    const { logout } = useAuth0();
    const navigate = useNavigate();
    
    const handleLogout = (e:any) => {
        e.preventDefault()
        logout({logoutParams: {returnTo: "http://localhost:3000/loggedout"}})
    }

    return (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1}}>
            <Toolbar>
                <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
                >
                    Financial Tracker
                </Typography>
                <a href="#" onClick={handleLogout} className="nav-link px-2 text-dark">Sign Out</a>
            </Toolbar>
        </AppBar>
    )
}

export default LayoutNavBar;