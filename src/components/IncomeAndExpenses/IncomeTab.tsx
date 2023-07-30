import { Grid, TableContainer, Table, TableHead, TableRow, TableCell, Checkbox, TableSortLabel, TableBody, Button, Stack } from "@mui/material";
import IncomeTable from "./IncomeTable";
import { useState } from "react";
import AddEditIncome from "./AddEditIncome";
import ConfirmDeleteModal from "../ConfirmDeleteModal";
import axios from "axios";

interface IIncomeTabProps {
    show: boolean;
    recurringIncome:any;
    setRecurringIncome:any;
}

const IncomeTab = (props:IIncomeTabProps) => {

    const [selectedRow, setSelectedRow] = useState<number | null>(null)
    const [showModal, setShowModal] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [incomeToEdit, setIncomeToEdit] = useState<any | null | undefined>(null)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [deleteModalMessage, setDeleteModalMessage] = useState<string | undefined>(undefined)

    const handleAddClicked = () => {
        setIsEditing(false)
        setShowModal(true)
    }

    const handleEditClicked = () => {
        let income = props.recurringIncome.find((i:any) => i.id === selectedRow)
        if (income === null) {
            console.log("Recurring Income with id", selectedRow, "not found")
        }
        else {
            setIncomeToEdit(income)
            setIsEditing(true)
            setShowModal(true)
        }
    }

    const handleDeleteClicked = () => {
        let income = props.recurringIncome.find((i:any) => i.id === selectedRow)
        if (income != null) {
            setDeleteModalMessage(`Are you sure you want to delete ${income.name}?`)
            setShowDeleteModal(true)
        }
    }

    const handleConfirmDelete = async () => {
        try {
            await axios.delete(`/api/v1/RecurringIncomes?recurringIncomeId=${selectedRow}`)
        }
        catch (error:any) {
            console.log(error)
        }
        finally {
            props.setRecurringIncome((prevData:any) => prevData.filter((i:any) => i.id !== selectedRow))
            setSelectedRow(null)
            setShowDeleteModal(false)
        }
    }

    const handleClose = () => {
        setIncomeToEdit(null)
        setShowModal(false)
    }
    
    return (
        <>
            {props.show && (
                <>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Stack direction="row" spacing={2}>
                                <Button color="primary" variant="contained" onClick={handleAddClicked}>Add</Button>
                                {selectedRow !== null && (
                                    <>
                                        <Button color="primary" variant="outlined" onClick={handleEditClicked}>Edit</Button>
                                        <Button color="error" variant="contained" onClick={handleDeleteClicked}>Delete</Button>
                                    </>
                                )}
                            </Stack>
                        </Grid>
                        <Grid item xs={12}>
                            <IncomeTable
                                recurringIncome={props.recurringIncome}
                                selectedRow={selectedRow}
                                setSelectedRow={setSelectedRow}
                            />
                        </Grid>
                    </Grid>
                    <AddEditIncome
                    show={showModal}
                    isEditing={isEditing}
                    income={incomeToEdit}
                    handleClose={handleClose}
                    setRecurringIncome={props.setRecurringIncome}
                     />
                    <ConfirmDeleteModal
                        show={showDeleteModal}
                        title="Delete Income"
                        message={deleteModalMessage}
                        handleConfirm={handleConfirmDelete}
                        handleClose={() => setShowDeleteModal(false)}
                    />
                </> 
            )}
        </>
    )
}

export default IncomeTab;