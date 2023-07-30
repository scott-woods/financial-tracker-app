import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Stack } from "@mui/material";
import { Formik, FormikProps, useFormik } from "formik";
import { Form } from "react-router-dom";
import AddEditIncomeFormFields from "./AddEditIncomeFormFields";
import * as Yup from 'yup'
import axios from "axios";
import { useEffect } from "react";


interface IAddEditIncomeProps {
    show: boolean
    isEditing: boolean
    income?: any
    handleClose: any
    setRecurringIncome: any
}

interface AddEditIncomeFormData {
    name: string
    amount: number
    timeframe: any
}

const defaultValues : AddEditIncomeFormData = {
    name: "",
    amount: 0,
    timeframe: null
}

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    amount: Yup.number().required('Amount is required').min(0, 'Amount must be greater than or equal to 0'),
    timeframe: Yup.number().required('Timeframe is required')
})

const AddEditIncome = (props:IAddEditIncomeProps) => {

    useEffect(() => {
        if (props.income) {
            formik.setValues(props.income)
        }
        else {
            formik.setValues(defaultValues)
        }
    }, [props.income])

    const handleSubmit = async (values:any) => {
        try {
            if (!props.isEditing) {
                await axios
                .post('/api/v1/RecurringIncomes', values)
                .then((res:any) => {
                    if (res.data) {
                        props.setRecurringIncome((prevData:any) => [...prevData, res.data])
                    }
                })
            }
            else {
                await axios.put(`/api/v1/RecurringIncomes`, values)

                props.setRecurringIncome((prevData:any) => {
                    return prevData.map((i:any) => {
                        return i.id === props.income.id ? {...i, ...values } : i
                    })
                })
            }
        }
        catch (error:any) {
            console.error('Error:', error)
        }
        finally {
            props.handleClose()
            formik.resetForm()
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
        <Dialog open={props.show} maxWidth="sm" fullWidth>
            <form onSubmit={formik.handleSubmit}>
                <DialogTitle>
                    {props.isEditing ? "Edit Income" : "Add Income"}
                </DialogTitle>
                <DialogContent>
                    <AddEditIncomeFormFields 
                        isEditing={props.isEditing}
                        income={props.income}
                        formik={formik}
                        />
                </DialogContent>
                <DialogActions>
                    <Stack direction="row" spacing={2} paddingBottom={2} paddingRight={2}>
                        <Button color="error" variant="contained" onClick={() => {
                            formik.resetForm()
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

export default AddEditIncome;