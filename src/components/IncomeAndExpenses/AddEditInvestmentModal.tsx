import { Dialog, DialogTitle, DialogContent, DialogActions, Stack, Button } from "@mui/material";
import AddEditInvestmentFormFields from "./AddEditInvestmentFormFields";
import { useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";


interface IAddEditInvestmentModalProps {
    show: boolean
    isEditing: boolean
    investment?: any
    setRecurringInvestments: any
    handleClose: any
}

interface AddEditInvestmentFormData {
    name: string
    amount: number
    timeframe: any
    isFromLiquid: boolean
}

const defaultValues : AddEditInvestmentFormData = {
    name: "",
    amount: 0,
    timeframe: null,
    isFromLiquid: false
}

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    amount: Yup.number().required('Amount is required').min(0, 'Amount must be greater than or equal to 0'),
    timeframe: Yup.number().required('Timeframe is required')
})

const AddEditInvestmentModal = (props:IAddEditInvestmentModalProps) => {

    useEffect(() => {
        if (props.investment) {
            formik.setValues(props.investment)
        }
        else {
            formik.setValues(defaultValues)
        }
    }, [props.investment])

    useEffect(() => {
        if (!props.isEditing) {
            formik.resetForm()
        }
        else if (props.investment) {
            formik.setValues(props.investment)
        }
    }, [props.isEditing])

    const handleSubmit = async (values:any) => {
        try {
            if (!props.isEditing) {
                await axios
                .post('/api/v1/RecurringInvestments', values)
                .then((res:any) => {
                    if (res.data) {
                        props.setRecurringInvestments((prevData:any) => [...prevData, res.data])
                    }
                })
            }
            else {
                await axios.put(`/api/v1/RecurringInvestments`, values)

                props.setRecurringInvestments((prevData:any) => {
                    return prevData.map((i:any) => {
                        return i.id === props.investment.id ? {...i, ...values } : i
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
                    {props.isEditing ? "Edit Investment" : "Add Investment"}
                </DialogTitle>
                <DialogContent>
                    <AddEditInvestmentFormFields 
                        formik={formik}
                    />
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

export default AddEditInvestmentModal;