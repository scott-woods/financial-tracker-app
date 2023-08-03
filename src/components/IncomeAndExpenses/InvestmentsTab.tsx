import { Box, Button, Grid, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import CustomDataTable from "../CustomDataTable";
import { currencyFormatter } from "../../tools/currencyFormatter";
import { timeframes } from "../../timeframes";
import AddEditInvestmentModal from "./AddEditInvestmentModal";
import ConfirmDeleteModal from "../ConfirmDeleteModal";
import axios from "axios";

interface IInvestmentsTabProps {
    show: boolean;
    investmentList: any[]
    setRecurringInvestments: any
}

const investmentColumns = [
    { label: "Name", accessor: "name" },
    { label: "Amount", accessor: "amount" },
    { label: "Timeframe", accessor: "timeframe" },
    { label: "Liquid?", accessor: "isFromLiquid", type: "checkbox" }
]

const InvestmentsTab = (props:IInvestmentsTabProps) => {

    const [selectedRow, setSelectedRow] = useState(null)
    const [investmentsTableData, setInvestmentsTableData] = useState<any[]>([])
    const [showAddEditModal, setShowAddEditModal] = useState(false)
    const [selectedInvestment, setSelectedInvestment] = useState<any>(null)
    const [isEditing, setIsEditing] = useState(false)
    const [showConfirmDelete, setShowConfirmDelete] = useState(false)

    useEffect(() => {
        setInvestmentsTableData(props.investmentList.map((i:any) => ({
            ...i,
            amount: currencyFormatter(i.amount),
            timeframe: timeframes.find(t => t.value === i.timeframe).label
        })))
    }, [props.investmentList])

    const handleAddClicked = () => {
        setIsEditing(false)
        setShowAddEditModal(true)
    }

    const handleEditClicked = () => {
        setIsEditing(true)
        setSelectedInvestment(props.investmentList.find(i => i.id === selectedRow))
        setShowAddEditModal(true)
    }

    const handleDeleteClicked = () => {
        let investment = props.investmentList.find((i:any) => i.id === selectedRow)
        if (investment != null) {
            setSelectedInvestment(investment)
            setShowConfirmDelete(true)
        }
    }

    const handleConfirmDelete = async () => {
        try {
            await axios.delete(`/api/v1/RecurringInvestments?recurringInvestmentId=${selectedRow}`)
        }
        catch (error) {
            console.log(error)
        }
        finally {
            props.setRecurringInvestments((prevData:any) => prevData.filter((i:any) => i.id !== selectedRow))
            setSelectedRow(null)
            setShowConfirmDelete(false)
        }
    }

    return (
        <>
            {props.show && (
                <>
                    <Stack height="100%" width="100%" spacing={2}>
                        <Stack direction="row" spacing={2}>
                            <Button color="primary" variant="contained" onClick={handleAddClicked}>Add</Button>
                            {selectedRow !== null && (
                                <>
                                    <Button color="primary" variant="outlined" onClick={handleEditClicked}>Edit</Button>
                                    <Button color="error" variant="contained" onClick={handleDeleteClicked}>Delete</Button>
                                </>
                            )}
                        </Stack>
                        <Box height="100%">
                            <CustomDataTable
                                isSelectable={true}
                                tableData={investmentsTableData}
                                columns={investmentColumns}
                                selectedRow={selectedRow}
                                setSelectedRow={setSelectedRow}
                            />
                        </Box>
                    </Stack>
                    {/* <Grid container spacing={2}>
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
                                tableData={investmentsTableData}
                                columns={investmentColumns}
                                selectedRow={selectedRow}
                                setSelectedRow={setSelectedRow}
                            />
                        </Grid>
                    </Grid> */}
                    <AddEditInvestmentModal
                        show={showAddEditModal}
                        isEditing={isEditing}
                        investment={selectedInvestment}
                        setRecurringInvestments={props.setRecurringInvestments}
                        handleClose={() => setShowAddEditModal(false)}
                    />
                    <ConfirmDeleteModal
                        show={showConfirmDelete}
                        title="Delete Investment"
                        message={`Are you sure you want to delete "${selectedInvestment?.name}"?`}
                        handleConfirm={handleConfirmDelete}
                        handleClose={() => setShowConfirmDelete(false)}
                    />
                </>
            )}
        </>
    )
}

export default InvestmentsTab;