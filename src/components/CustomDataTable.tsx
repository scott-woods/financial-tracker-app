import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableSortLabel, TableBody, Checkbox, TablePagination, TableFooter } from "@mui/material";
import { timeframes } from "../timeframes";
import { currencyFormatter } from "../tools/currencyFormatter";
import { ViewColumnSharp } from "@mui/icons-material";
import { faColumns } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

interface ICustomDataTableProps {
    isSelectable: boolean
    tableData: any[]
    columns: { 
        label: string
        accessor: string
        type?: string
    }[]
    selectedRow?: any
    setSelectedRow?: any
}

const CustomDataTable = (props:ICustomDataTableProps) => {

    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [sorting, setSorting] = useState<{ column: string, order: 'asc' | 'desc' }>({column:"", order:"asc"})
    const [sortedData, setSortedData] = useState<any[]>([])

    //sorting
    useEffect(() => {
        let col = ""
        if (sorting.column === "") {
            col = props.columns[0].accessor
            setSorting((prevSorting:any) => ({
                column: props.columns[0].accessor,
                order: prevSorting.order
            }))
        }
        else {
            col = sorting.column
        }
        setSortedData(sortData(props.tableData, col, sorting.order))
    }, [props.tableData, sorting])

    const handleRowSelect = (row:any) => {
        props.setSelectedRow((prevSelectedRow:any) =>
            prevSelectedRow === row
                ? null
                : row
        )
    }

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        props.setSelectedRow(null)
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSortRequest = (column: string) => {
        setSorting((prevSorting:any) => ({
            column,
            order: prevSorting.column === column && prevSorting.order === 'asc' ? 'desc' : 'asc'
        }))
    }

    const sortData = (data:any[], column:string, order: 'asc' | 'desc') => {
        const sortedData = [...data].sort((a, b) => {
            if (order === 'asc') {
                return a[column] > b[column] ? 1 : -1
            }
            else {
                return a[column] < b[column] ? 1 : -1
            }
        })

        return sortedData
    }

    return (
        <TableContainer component={Paper} sx={{height:"100%"}}>
            <Table size="small" stickyHeader>
                <TableHead>
                    <TableRow>
                        {props.isSelectable && (
                            <TableCell padding="checkbox" />
                        )}
                        {props.columns.map((col:any) => (
                            <TableCell key={col.label}>
                                <TableSortLabel
                                    active={sorting.column === col.accessor}
                                    direction={sorting.column === col.accessor ? sorting?.order : 'asc'}
                                    onClick={() => handleSortRequest(col.accessor)}
                                >
                                    {col.label}
                                </TableSortLabel>
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedData.slice((page * rowsPerPage), ((page * rowsPerPage) + rowsPerPage)).map((item, index) => (
                        <TableRow key={index}>
                            {props.isSelectable && (
                                <TableCell padding="checkbox">
                                    <Checkbox checked={props.selectedRow === item.id} onChange={() => handleRowSelect(item.id)} />
                                </TableCell>
                            )}
                            {props.columns.map((col:any) => {
                                switch (col.type) {
                                    case "checkbox":
                                        return (
                                            <TableCell padding="checkbox" key={col.label}>
                                                <Checkbox disabled checked={item[col.accessor]} />
                                            </TableCell>
                                        )
                                    case "date":
                                        const date = new Date(item[col.accessor])
                                        const formattedDate = new Intl.DateTimeFormat('en-US', {
                                            year: 'numeric',
                                            month: '2-digit',
                                            day: '2-digit',
                                            hour: 'numeric',
                                            minute: '2-digit',
                                            hour12: true
                                        }).format(date)
                                        return (
                                            <TableCell key={col.label}>
                                                {formattedDate}
                                            </TableCell>
                                        )
                                    case "currency":
                                        return (
                                            <TableCell key={col.label}>
                                                {currencyFormatter(item[col.accessor])}
                                            </TableCell>
                                        )
                                    default:
                                        return (
                                            <TableCell key={col.label}>
                                                {item[col.accessor]}
                                            </TableCell>
                                        )
                                }
                            })}
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, { label: 'All', value: props.tableData.length }]}
                            colSpan={props.columns.length + (props.isSelectable ? 1 : 0)}
                            count={props.tableData.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    )
}

export default CustomDataTable;