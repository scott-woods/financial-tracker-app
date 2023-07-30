import { Grid, TableContainer, Table, TableHead, TableRow, TableCell, Checkbox, TableSortLabel, TableBody, Button, Stack } from "@mui/material";
import IncomeTable from "./IncomeTable";
import { useEffect, useState } from "react";
import AddEditIncomeModal from "./AddEditIncomeModal";
import ConfirmDeleteModal from "../ConfirmDeleteModal";
import axios from "axios";
import { timeframes } from "../../timeframes";
import CustomDataTable from "../CustomDataTable";
import { currencyFormatter } from "../../tools/currencyFormatter";

interface IIncomeTabProps {
    show: boolean;
    recurringIncome:any;
    setRecurringIncome:any;
}

const incomeColumns = [
    { label: 'Name', accessor: 'name' },
    { label: 'Amount', accessor: 'amount' },
    { label: 'Timeframe', accessor: 'timeframe' }
]

const IncomeTab = (props:IIncomeTabProps) => {

    const [selectedRow, setSelectedRow] = useState<number | null>(null)
    const [showModal, setShowModal] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [selectedIncome, setSelectedIncome] = useState<any | null | undefined>(null)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [incomeTableData, setIncomeTableData] = useState<any>([])

    useEffect(() => {
        setIncomeTableData(props.recurringIncome.map((i:any) => ({
            ...i,
            amount: currencyFormatter(i.amount),
            timeframe: timeframes.find(t => t.value === i.timeframe).label
        })))
    }, [props.recurringIncome])

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
            setSelectedIncome(income)
            setIsEditing(true)
            setShowModal(true)
        }
    }

    const handleDeleteClicked = () => {
        let income = props.recurringIncome.find((i:any) => i.id === selectedRow)
        if (income != null) {
            setSelectedIncome(income)
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
        setSelectedIncome(null)
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
                            <CustomDataTable
                                isSelectable={true}
                                tableData={incomeTableData}
                                columns={incomeColumns}
                                selectedRow={selectedRow}
                                setSelectedRow={setSelectedRow}
                            />
                        </Grid>
                    </Grid>
                    <AddEditIncomeModal
                    show={showModal}
                    isEditing={isEditing}
                    income={selectedIncome}
                    handleClose={handleClose}
                    setRecurringIncome={props.setRecurringIncome}
                     />
                    <ConfirmDeleteModal
                        show={showDeleteModal}
                        title="Delete Income"
                        message={`Are you sure you want to delete "${selectedIncome?.name}"?`}
                        handleConfirm={handleConfirmDelete}
                        handleClose={() => setShowDeleteModal(false)}
                    />
                </> 
            )}
        </>
    )
}

export default IncomeTab;