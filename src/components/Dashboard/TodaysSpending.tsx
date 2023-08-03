import { Button, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { currencyFormatter } from "../../tools/currencyFormatter"
import { useState } from "react"
import ExpenseQuickAdd from "./ExpenseQuickAdd"

interface ITodaysSpendingProps {
    amount: number
    setExpenses: any
}

const TodaysSpending = (props:ITodaysSpendingProps) => {

    const [showQuickAddModal, setShowQuickAddModal] = useState(false)

    return (
        <>
            <Box display="flex" justifyContent="center" alignItems="center" flexWrap="wrap">
                <Typography variant="h6">
                    Today's Spending
                </Typography>
                <Typography>
                    {currencyFormatter(props.amount)}
                </Typography>
                <Button variant="contained" color="primary" onClick={() => setShowQuickAddModal(true)}>
                    Quick Add
                </Button>
            </Box>
            <ExpenseQuickAdd
                show={showQuickAddModal}
                handleClose={() => setShowQuickAddModal(false)}
                setExpenses={props.setExpenses}
            />
        </>
    )
}

export default TodaysSpending