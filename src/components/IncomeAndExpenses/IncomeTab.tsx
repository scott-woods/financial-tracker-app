import { Grid, TableContainer, Table, TableHead, TableRow, TableCell, Checkbox, TableSortLabel, TableBody } from "@mui/material";

interface IIncomeTabProps {
    show: boolean;
}

const IncomeTab = (props:IIncomeTabProps) => {
    return (
        <>
            {props.show && (
                <Grid container>
                    <Grid item xs={12}>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell padding="checkbox">
                                            <Checkbox />
                                        </TableCell>
                                        <TableCell key={"name"}>
                                            <TableSortLabel>
                                                Name
                                            </TableSortLabel>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell padding="checkbox">
                                            <Checkbox color="primary" />
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            )}
        </>
    )
}

export default IncomeTab;