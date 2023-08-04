import { Typography, List, ListItem, ListItemText, Divider, IconButton } from "@mui/material"
import { Stack, Box } from "@mui/system"
import { currencyFormatter } from "../../tools/currencyFormatter"
import { MoreHoriz } from "@mui/icons-material"
import ManageExpensesDialog from "./ManageExpensesDialog"
import { useState } from "react"

interface IRecentExpensesProps {
    expenses: any[]
    setExpenses: any
}

const RecentExpenses = (props:IRecentExpensesProps) => {

    const [showManageExpensesDialog, setShowManageExpensesDialog] = useState(false)

    const handleManageClicked = () => {
        setShowManageExpensesDialog(true)
    }

    return (
        <>
            <Box height="100%" padding={2}>
                <Stack height="100%">
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6">
                            Recent Expenses
                        </Typography>
                        <IconButton onClick={handleManageClicked} aria-label="manage-expenses">
                            <MoreHoriz />
                        </IconButton>
                    </Box>
                    <Box height="100%">
                        <List>
                            {props.expenses.slice(0, 5).map((expense:any) => {
                                let text = currencyFormatter(expense.amount)
                                if (expense.name) {
                                    text += ` - ${expense.name}`
                                }
                                return (
                                    <>
                                        <ListItem>
                                            <ListItemText primary={text} />
                                        </ListItem>
                                        <Divider variant="middle" />
                                    </>
                                )
                            })}
                        </List>
                    </Box>
                </Stack>
            </Box>
            <ManageExpensesDialog
                    show={showManageExpensesDialog}
                    setShow={setShowManageExpensesDialog}
                    expenses={props.expenses}
                    handleClose={() => setShowManageExpensesDialog(false)}
                    setExpenses={props.setExpenses}
            />
        </>
    )
}

export default RecentExpenses;