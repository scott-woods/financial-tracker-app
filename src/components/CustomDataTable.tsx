import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableSortLabel, TableBody, Checkbox } from "@mui/material";
import { timeframes } from "../timeframes";
import { currencyFormatter } from "../tools/currencyFormatter";
import { ViewColumnSharp } from "@mui/icons-material";
import { faColumns } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

interface ICustomDataTableProps {
    isSelectable: boolean
    tableData: any[]
    columns: { 
        label: string
        accessor: keyof any
        type?: string
    }[]
    selectedRow?: any
    setSelectedRow?: any
}

const CustomDataTable = (props:ICustomDataTableProps) => {

    const handleRowSelect = (row:any) => {
        props.setSelectedRow((prevSelectedRow:any) =>
            prevSelectedRow === row
                ? null
                : row
        )
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {props.isSelectable && (
                            <TableCell padding="checkbox" />
                        )}
                        {props.columns.map((col:any) => (
                            <TableCell key={col.label}>
                                <TableSortLabel>
                                    {col.label}
                                </TableSortLabel>
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.tableData.map((item, index) => (
                        <TableRow key={index}>
                            {props.isSelectable && (
                                <TableCell padding="checkbox">
                                    <Checkbox checked={props.selectedRow === item.id} onChange={() => handleRowSelect(item.id)} />
                                </TableCell>
                            )}
                            {props.columns.map((col) => (
                                <>
                                    {col.type === "checkbox" && (
                                        <TableCell key={col.label}>
                                            <Checkbox disabled checked={item[col.accessor]} />
                                        </TableCell>
                                    )}
                                    {col.type !== "checkbox" && (
                                        <TableCell key={col.label}>
                                            {item[col.accessor]}
                                        </TableCell>
                                    )}
                                </>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default CustomDataTable;