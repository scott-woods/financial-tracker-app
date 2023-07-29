import { Box, Button, Grid, Paper, Stack, Typography } from "@mui/material";
import NetWorth from "../components/AssetsAndDebts/NetWorth";
import { setSelectedPage } from "../state/slices/selectedPageSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const AssetsAndDebts = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setSelectedPage(2))
    }, [])

    return (
        <Grid container spacing={4} padding={4}>
            <Grid item lg={7}>
                <Grid container spacing={2} alignItems='stretch'>
                    <Grid item lg={6}>
                        <NetWorth />
                    </Grid>
                    <Grid item lg={6}>
                        <Stack height='100%' spacing={2}>
                            <Paper sx={{padding:2, height:'100%'}}>
                                <Box>
                                    <Typography>
                                        Total Assets
                                    </Typography>
                                </Box>
                            </Paper>
                            <Paper sx={{padding:2, height:'100%'}}>
                                <Box>
                                    <Typography>
                                        Total Debts
                                    </Typography>
                                </Box>
                            </Paper>
                        </Stack>
                    </Grid>
                    <Grid item lg={12}>
                        <Paper sx={{padding:2}}>
                            <Box>
                                <Typography>
                                    Chart
                                </Typography>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
            <Grid display="flex" item lg={5}>
                <Paper sx={{flexGrow:1, padding:2}}>
                    <Typography>
                        Assets
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default AssetsAndDebts;