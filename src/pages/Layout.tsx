import { Outlet } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { ThemeProvider } from "@emotion/react";
import { Copyright } from "@mui/icons-material";
import { Box, CssBaseline, AppBar, Toolbar, IconButton, Typography, Badge, Drawer, Divider, List, Container, Grid, Paper, ListItemText, ListItemButton, Icon } from "@mui/material";
import LayoutNavBar from "../components/LayoutNavBar";
import LayoutSideBar from "../components/LayoutSideBar";

const Layout = () => {

    //States
    const [showSidebar, setShowSidebar] = useState(true);

    //toggle sidebar
    const toggleSidebar = () => {
        setShowSidebar(!showSidebar)
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <LayoutNavBar />
            <LayoutSideBar />
            <Box
            component="main"
            sx={{
                backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[900],
                flexGrow: 1,
                height: "100vh",
                overflow: 'auto',
            }}
            >
                <Toolbar />
                <Box height={`calc(100vh - 64px)`} overflow={"auto"}>
                    <Outlet />
                </Box>
            </Box>
        </Box>
    )
}

export default Layout;