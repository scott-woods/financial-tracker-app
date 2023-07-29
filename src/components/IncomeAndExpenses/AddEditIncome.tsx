import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { Formik } from "formik";
import { Form } from "react-router-dom";
import AddEditIncomeFormFields from "./AddEditIncomeForm";


interface IAddEditIncomeProps {
    show: boolean
    isEditing: boolean
    income?: any
    handleClose: any
}

interface AddEditIncomeFormData {
    name: string
    amount: number
    timeframe: number
}

const defaultValues : AddEditIncomeFormData = {
    name: "",
    amount: 0,
    timeframe: 0
}

const AddEditIncome = (props:IAddEditIncomeProps) => {

    const handleSubmit = (values:AddEditIncomeFormData) => {
        console.log(values)
    }

    return (
        <Dialog open={props.show}>
            <DialogTitle>
                {props.isEditing ? "Edit Income" : "Add Income"}
            </DialogTitle>
            <DialogContent>
                <Formik
                    initialValues={defaultValues}
                    onSubmit={handleSubmit}
                >
                    <Form>
                        <AddEditIncomeFormFields isEditing={props.isEditing} income={props.income} />
                    </Form>
                </Formik>
            </DialogContent>
            <DialogActions>
                <Button type="submit" variant="contained" color="primary">
                    Submit
                </Button>
                <Button color="error" onClick={props.handleClose}>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    )   
}

export default AddEditIncome;