import { Typography, List, ListItem, ListItemText, Divider, IconButton, Menu, MenuItem } from "@mui/material"
import { Stack, Box } from "@mui/system"
import { currencyFormatter } from "../../tools/currencyFormatter"
import { MoreHoriz } from "@mui/icons-material"
import ManageExpensesDialog from "./ManageExpensesDialog"
import { useEffect, useState } from "react"
import ExpenseQuickAdd from "./ExpenseQuickAdd"

interface IRecentExpensesProps {
    expenses: any[]
    setExpenses: any
}

const RecentExpenses = (props:IRecentExpensesProps) => {

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
    const [showMenu, setShowMenu] = useState(false)
    const [showAddExpenseDialog, setShowAddExpenseDialog] = useState(false)
    const [showManageExpensesDialog, setShowManageExpensesDialog] = useState(false)
    const [first5Expenses, setFirst5Expenses] = useState<any[]>([])

    useEffect(() => {
        let first5 = props.expenses
            .sort((a, b) => {
                let aDate = new Date(a.date)
                let bDate = new Date(b.date)
                return bDate.getTime() - aDate.getTime()
            })
            .slice(0, 5)
        setFirst5Expenses(first5)
    }, [props.expenses])

    const handleManageClicked = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
        setShowMenu(true)
    }

    const handleAddClicked = () => {
        setAnchorEl(null)
        setShowMenu(false)
        setShowAddExpenseDialog(true)
    }

    const handleEditClicked = () => {
        setAnchorEl(null)
        setShowMenu(false)
        setShowManageExpensesDialog(true)
    }

    const handleClose = () => {
        setAnchorEl(null)
        setShowMenu(false)
    }

    return (
        <>
            <Stack height="100%">
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6">
                        Recent Expenses
                    </Typography>
                    <IconButton onClick={handleManageClicked} aria-label="manage-expenses">
                        <MoreHoriz />
                    </IconButton>
                    <Menu open={showMenu} anchorEl={anchorEl} onClose={handleClose}>
                        <MenuItem onClick={handleAddClicked}>
                            Add Expense
                        </MenuItem>
                        <MenuItem onClick={handleEditClicked}>
                            Manage Expenses
                        </MenuItem>
                    </Menu>
                </Box>
                <Box height="100%">
                    <List dense>
                        {first5Expenses.map((expense:any) => {
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
            <ExpenseQuickAdd
                show={showAddExpenseDialog}
                isEditing={false}
                setExpenses={props.setExpenses}
                handleClose={() => setShowAddExpenseDialog(false)}
            />
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