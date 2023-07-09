import { AppBar, Box, Container, Grid, Toolbar, Typography } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthRequired";

const Home = () => {
    
    const user = useContext(AuthContext);

    return (
        <Grid container>
            <Grid item xs={12}>
                <p>Test</p>
            </Grid>
        </Grid>
    )
}

export default Home;