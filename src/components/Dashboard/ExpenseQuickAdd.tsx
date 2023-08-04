import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, MenuItem, TextField } from "@mui/material"
import { Stack } from "@mui/system"
import AddEditExpenseFormFields from "../IncomeAndExpenses/AddEditExpenseFormFields"
import { useFormik } from "formik"
import * as Yup from "yup"
import axios from "axios"
import { timeframes } from "../../timeframes"
import { useEffect } from "react"


interface IExpenseQuickAddProps {
    show: boolean
    handleClose: any
    setExpenses: any
    isEditing?: boolean
    selectedExpense?: any
}

interface IExpenseQuickAddValues {
    name?: string
    amount: number
}

const defaultValues : IExpenseQuickAddValues = {
    name: "",
    amount: 0
}

const validationSchema = Yup.object().shape({
    name: Yup.string(),
    amount: Yup.number().required('Amount is required').min(0, 'Amount must be greater than or equal to 0')
})

const ExpenseQuickAdd = (props:IExpenseQuickAddProps) => {

    useEffect(() => {
        if (props.selectedExpense) {
            formik.setValues(props.selectedExpense)
        }
        else {
            formik.setValues(defaultValues)
        }
    }, [props.selectedExpense])

    useEffect(() => {
        if (!props.isEditing) {
            formik.resetForm()
        }
        else if (props.selectedExpense) {
            formik.setValues(props.selectedExpense)
        }
    }, [props.isEditing])

    const handleSubmit = async (values:any) => {
        try {
            if (!props.isEditing) {
                await axios
                .post('/api/v1/Expenses', values)
                .then((res:any) => {
                    if (res.data) {
                        props.setExpenses((prevData:any) => [...prevData, res.data])
                    }
                })
            }
            else if (props.isEditing) {
                await axios
                    .put('/api/v1/Expenses', values)
                    .then((res:any) => {
                        if (res.data) {
                            props.setExpenses((prevData:any) => {
                                return prevData.map((i:any) => {
                                    return i.id === props.selectedExpense.id ? {...i, ...values } : i
                                })
                            })
                        }
                    })
            }
        }
        catch (error) {
            console.log(error)
        }
        finally {
            formik.resetForm()
            props.handleClose()
        }
    }

    const formik = useFormik({
        initialValues: defaultValues,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            handleSubmit(values)
        }
    })

    return (
        <Dialog open={props.show} maxWidth="sm">
            <form onSubmit={formik.handleSubmit}>
                <DialogTitle>
                    {props.isEditing ? "Edit Expense" : "Add Expense"}
                </DialogTitle>
                <DialogContent>
                    <Grid container padding={2} spacing={4}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                id="name"
                                name="name"
                                label="Name (Optional)"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                type="number"
                                id="amount"
                                name="amount"
                                label="Amount"
                                value={formik.values.amount}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.amount && Boolean(formik.errors.amount)}
                                helperText={formik.touched.amount && formik.errors.amount}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Stack direction="row" spacing={2} paddingBottom={2} paddingRight={2}>
                        <Button color="error" variant="contained" onClick={() => {
                            props.handleClose()
                        }}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="contained" color="primary">
                            Submit
                        </Button>
                    </Stack>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default ExpenseQuickAdd