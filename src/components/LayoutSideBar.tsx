import { Drawer, Toolbar, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { Home, CurrencyExchange, Savings, Flag } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useDispatch, useSelector } from "react-redux";
import { selectSelectedPage, setSelectedPage } from "../state/slices/selectedPageSlice";


const LayoutSideBar = () => {

    const navigate = useNavigate()

    const selectedPage = useSelector(selectSelectedPage)

    const handleItemClicked = (location:any) => {
        navigate(location)
    }

    return (
        <Drawer 
        variant="permanent"
        sx={{
            width:.17,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: .17, boxSizing: 'border-box' }
            }}
        >
            <Toolbar />
            <Box sx={{ overflow: 'auto' }}>
                <List>
                    <MenuItem>
                        <ListItemButton onClick={() => handleItemClicked("dashboard")} selected={selectedPage === 0}>
                            <ListItemIcon>
                                <Home />
                            </ListItemIcon>
                            <ListItemText sx={{wordWrap:"break-word"}} primary="Dashboard" />
                        </ListItemButton>
                    </MenuItem>
                    <MenuItem>
                        <ListItemButton onClick={() => handleItemClicked("income-and-expenses")} selected={selectedPage === 1}>
                            <ListItemIcon>
                                <CurrencyExchange />
                            </ListItemIcon>
                            <ListItemText sx={{wordWrap:"break-word"}} primary="Income & Expenses" />
                        </ListItemButton>
                    </MenuItem>
                    <MenuItem>
                        <ListItemButton onClick={() => handleItemClicked("assets-and-debts")} selected={selectedPage === 2}>
                            <ListItemIcon>
                                <Savings />
                            </ListItemIcon>
                            <ListItemText sx={{wordWrap:"break-word"}} primary="Assets & Debts" />
                        </ListItemButton>
                    </MenuItem>
                    <MenuItem>
                        <ListItemButton onClick={() => handleItemClicked("savings-goals")} selected={selectedPage === 3}>
                            <ListItemIcon>
                                <Flag />
                            </ListItemIcon>
                            <ListItemText sx={{wordWrap:"break-word"}} primary="Manage Savings Goals" />
                        </ListItemButton>
                    </MenuItem>
                </List>
            </Box>
        </Drawer>
    )
}

export default LayoutSideBar;