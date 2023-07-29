import { Grid, TableContainer, Table, TableHead, TableRow, TableCell, Checkbox, TableSortLabel, TableBody, Button } from "@mui/material";
import IncomeTable from "./IncomeTable";
import { useState } from "react";
import AddEditIncome from "./AddEditIncome";

interface IIncomeTabProps {
    show: boolean;
    recurringIncome:any;
}

const IncomeTab = (props:IIncomeTabProps) => {

    const [selectedRow, setSelectedRow] = useState<number | null>(null)
    const [showModal, setShowModal] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [incomeToEdit, setIncomeToEdit] = useState<any | null | undefined>(null)

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

    const handleClose = () => {
        setShowModal(false)
    }
    
    return (
        <>
            {props.show && (
                <>
                    <Grid container>
                        <Grid item xs={12}>
                            <Button color="primary" onClick={handleAddClicked}>Add</Button>
                            {selectedRow !== null && (
                                <>
                                    <Button color="primary" onClick={handleEditClicked}>Edit</Button>
                                    <Button color="error">Delete</Button>
                                </>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <IncomeTable
                                recurringIncome={props.recurringIncome}
                                selectedRow={selectedRow}
                                setSelectedRow={setSelectedRow}
                            />
                        </Grid>
                    </Grid>
                    <AddEditIncome show={showModal} isEditing={isEditing} income={incomeToEdit} handleClose={handleClose} />
                </> 
            )}
        </>
    )
}

export default IncomeTab;