import { useEffect, useState } from "react";
import { currencyFormatter } from "../../tools/currencyFormatter";
import { timeframes } from "../../timeframes";
import axios from "axios";
import { Box, Button, Grid, Stack } from "@mui/material";
import CustomDataTable from "../CustomDataTable";
import ConfirmDeleteModal from "../ConfirmDeleteModal";
import AddEditExpenseModal from "./AddEditExpenseModal";

interface IExpensesTabProps {
    show: boolean;
    recurringExpenseList: any[]
    setRecurringExpenses: any
}

const expenseColumns = [
    { label: "Name", accessor: "name" },
    { label: "Amount", accessor: "amount", type: "currency" },
    { label: "Timeframe", accessor: "timeframe" }
]

const ExpensesTab = (props:IExpensesTabProps) => {

    const [selectedRow, setSelectedRow] = useState(null)
    const [expensesTableData, setExpensesTableData] = useState<any[]>([])
    const [showAddEditModal, setShowAddEditModal] = useState(false)
    const [selectedExpense, setSelectedExpense] = useState<any>(null)
    const [isEditing, setIsEditing] = useState(false)
    const [showConfirmDelete, setShowConfirmDelete] = useState(false)

    useEffect(() => {
        setExpensesTableData(props.recurringExpenseList.map((e:any) => ({
            ...e,
            timeframe: timeframes.find(t => t.value === e.timeframe).label
        })))
    }, [props.recurringExpenseList])

    const handleAddClicked = () => {
        setIsEditing(false)
        setShowAddEditModal(true)
    }

    const handleEditClicked = () => {
        setIsEditing(true)
        setSelectedExpense(props.recurringExpenseList.find(e => e.id === selectedRow))
        setShowAddEditModal(true)
    }

    const handleDeleteClicked = () => {
        let expense = props.recurringExpenseList.find((e:any) => e.id === selectedRow)
        if (expense != null) {
            setSelectedExpense(expense)
            setShowConfirmDelete(true)
        }
    }

    const handleConfirmDelete = async () => {
        try {
            await axios.delete(`/api/v1/RecurringExpenses?recurringExpenseId=${selectedRow}`)
        }
        catch (error) {
            console.log(error)
        }
        finally {
            props.setRecurringExpenses((prevData:any) => prevData.filter((i:any) => i.id !== selectedRow))
            setSelectedRow(null)
            setShowConfirmDelete(false)
        }
    }

    return (
        <>
            {props.show && (
                <>
                    <Box height="100%" display="table" width="100%">
                        <Stack direction="row" spacing={2} marginBottom={2}>
                            <Button color="primary" variant="contained" onClick={handleAddClicked}>Add</Button>
                            {selectedRow !== null && (
                                <>
                                    <Button color="primary" variant="outlined" onClick={handleEditClicked}>Edit</Button>
                                    <Button color="error" variant="contained" onClick={handleDeleteClicked}>Delete</Button>
                                </>
                            )}
                        </Stack>
                        <Box display="table-row" width="100%" height="100%" position="relative">
                            <Box position="absolute" sx={{overflowY:"auto", left:0, top:0, right:0, bottom:0}}>
                                <CustomDataTable
                                    isSelectable={true}
                                    tableData={expensesTableData}
                                    columns={expenseColumns}
                                    selectedRow={selectedRow}
                                    setSelectedRow={setSelectedRow}
                                />
                            </Box>
                        </Box>
                    </Box>
                    <AddEditExpenseModal
                        show={showAddEditModal}
                        isEditing={isEditing}
                        expense={selectedExpense}
                        setRecurringExpenses={props.setRecurringExpenses}
                        handleClose={() => setShowAddEditModal(false)}
                    />
                    <ConfirmDeleteModal
                        show={showConfirmDelete}
                        title="Delete Expense"
                        message={`Are you sure you want to delete "${selectedExpense?.name}"?`}
                        handleConfirm={handleConfirmDelete}
                        handleClose={() => setShowConfirmDelete(false)}
                    />
                </>
            )}
        </>
    )
}

export default ExpensesTab;