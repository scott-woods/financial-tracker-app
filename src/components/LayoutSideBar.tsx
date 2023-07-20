import { Drawer, Toolbar, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { Home, CurrencyExchange, Savings } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


const LayoutSideBar = () => {

    const navigate = useNavigate()
    const [selected, setSelected] = useState(0);

    const handleItemClicked = (index:any, location:any) => {
        setSelected(index)
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
                        <ListItemButton onClick={() => handleItemClicked(0, "dashboard")} selected={selected === 0}>
                            <ListItemIcon>
                                <Home />
                            </ListItemIcon>
                            <ListItemText sx={{wordWrap:"break-word"}} primary="Dashboard" />
                        </ListItemButton>
                    </MenuItem>
                    <MenuItem>
                        <ListItemButton onClick={() => handleItemClicked(1, "income-and-expenses")} selected={selected === 1}>
                            <ListItemIcon>
                                <CurrencyExchange />
                            </ListItemIcon>
                            <ListItemText sx={{wordWrap:"break-word"}} primary="Income & Expenses" />
                        </ListItemButton>
                    </MenuItem>
                    <MenuItem>
                        <ListItemButton onClick={() => handleItemClicked(2, "assets-and-debts")} selected={selected === 2}>
                            <ListItemIcon>
                                <Savings />
                            </ListItemIcon>
                            <ListItemText sx={{wordWrap:"break-word"}} primary="Assets & Debts" />
                        </ListItemButton>
                    </MenuItem>
                </List>
            </Box>
        </Drawer>
    )
}

export default LayoutSideBar;