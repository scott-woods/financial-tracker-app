import { Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from "@mui/material"
import { currencyFormatter } from "../../tools/currencyFormatter";
import { useState } from "react";


interface IIncomeTableProps {
    recurringIncome:any
    selectedRow:number | null
    setSelectedRow:any
}

const IncomeTable = (props:IIncomeTableProps) => {

    const handleRowSelect = (id:number) => {
        props.setSelectedRow((prevSelectedRow:any) =>
            prevSelectedRow === id
                ? null
                : id
        )
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell padding="checkbox">
                        </TableCell>
                        <TableCell key={"name"}>
                            <TableSortLabel>
                                Name
                            </TableSortLabel>
                        </TableCell>
                        <TableCell key={"amount"}>
                            <TableSortLabel>
                                Amount
                            </TableSortLabel>
                        </TableCell>
                        <TableCell key={"timeframe"}>
                            <TableSortLabel>
                                Timeframe
                            </TableSortLabel>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.recurringIncome.map((income:any) => (
                        <TableRow key={income.id}>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    checked={props.selectedRow === income.id}
                                    onChange={() => handleRowSelect(income.id)}
                                />
                            </TableCell>
                            <TableCell>
                                {income.name}
                            </TableCell>
                            <TableCell>
                                {currencyFormatter(income.amount)}
                            </TableCell>
                            <TableCell>
                                {income.timeframe}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default IncomeTable;