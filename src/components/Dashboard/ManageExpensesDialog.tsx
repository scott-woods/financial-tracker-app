import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from "@mui/material";
import CustomDataTable from "../CustomDataTable";
import { useEffect, useState } from "react";
import ExpenseQuickAdd from "./ExpenseQuickAdd";
import axios from "axios";

interface IManageExpensesDialogProps {
    show: boolean
    setShow: any
    expenses: any[]
    handleClose: any
    setExpenses: any
}

const expensesTableColumns = [
    { label: 'Name', accessor: 'name' },
    { label: 'Amount', accessor: 'amount', type: 'currency' },
    { label: 'Date', accessor: 'date', type: 'date' }
]

const ManageExpensesDialog = (props:IManageExpensesDialogProps) => {

    const [selectedRow, setSelectedRow] = useState<any | null | undefined>(null)
    const [showAddEditExpenseDialog, setShowAddEditExpenseDialog] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [selectedExpense, setSelectedExpense] = useState<any | null | undefined>(null)

    const handleAddClicked = () => {
        setIsEditing(false)
        setShowAddEditExpenseDialog(true)
    }

    const handleEditClicked = () => {
        let expense = props.expenses.find((e:any) => e.id === selectedRow)
        if (expense === null) {
            console.log("Expense with id", selectedRow, "not found")
        }
        else {
            setSelectedExpense(expense)
            setIsEditing(true)
            setShowAddEditExpenseDialog(true)
        }
    }

    const handleDeleteClicked = async () => {
        let expense = props.expenses.find((e:any) => e.id === selectedRow)
        if (expense != null) {
            try {
                await axios.delete(`/api/v1/Expenses?expenseId=${selectedRow}`)
            }
            catch (error:any) {
                console.log(error)
            }
            finally {
                props.setExpenses((prevData:any) => prevData.filter((e:any) => e.id !== selectedRow))
                setSelectedRow(null)
                setSelectedExpense(null)
            }
        }
    }

    const handleCloseAddDialog = () => {
        setShowAddEditExpenseDialog(false)
    }

    return (
        <>
            <Dialog maxWidth="sm" open={props.show}>
                <DialogTitle>
                    Manage Expenses
                </DialogTitle>
                <DialogContent>
                    <Stack spacing={2}>
                        <Stack direction="row" spacing={2}>
                            <Button color="primary" variant="contained" onClick={handleAddClicked}>Add</Button>
                            {selectedRow > 0 && (
                                <>
                                    <Button color="primary" variant="outlined" onClick={handleEditClicked}>Edit</Button>
                                    <Button color="error" variant="contained" onClick={handleDeleteClicked}>Delete</Button>
                                </>
                            )}
                        </Stack>
                        <CustomDataTable
                            isSelectable
                            tableData={props.expenses}
                            columns={expensesTableColumns}
                            selectedRow={selectedRow}
                            setSelectedRow={setSelectedRow}
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" variant="outlined" onClick={props.handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
            <ExpenseQuickAdd
                show={showAddEditExpenseDialog}
                isEditing={isEditing}
                selectedExpense={selectedExpense}
                handleClose={handleCloseAddDialog}
                setExpenses={props.setExpenses}
            />
        </>
    )
}

export default ManageExpensesDialog;