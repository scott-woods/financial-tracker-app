import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableSortLabel, TableBody, Checkbox, TablePagination, TableFooter } from "@mui/material";
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

    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)

    const handleRowSelect = (row:any) => {
        props.setSelectedRow((prevSelectedRow:any) =>
            prevSelectedRow === row
                ? null
                : row
        )
    }

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <TableContainer component={Paper} sx={{height:"100%"}}>
            <Table size="small">
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
                                        <TableCell padding="checkbox" key={col.label}>
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
                {/* <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, { label: 'All', value: -1 }]}
                            colSpan={3}
                            count={props.tableData.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableRow>
                </TableFooter> */}
            </Table>
        </TableContainer>
    )
}

export default CustomDataTable;