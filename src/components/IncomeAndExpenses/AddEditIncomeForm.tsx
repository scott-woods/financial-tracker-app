import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Field, Form, Formik } from "formik";

interface IAddEditIncomeFormFieldsProps {
    income?: any
    isEditing: boolean
}

const timeframes = [
    { value: 0, label: 'Monthly' },
    { value: 1, label: 'Yearly' }
]

const AddEditIncomeFormFields = (props:IAddEditIncomeFormFieldsProps) => {
    
    return (
        <>
            <div>
                <Field
                    as={TextField}
                    name="name"
                    label="Name"
                    variant="outlined"
                    fullWidth
                />
            </div>
            <div>
                <Field
                    as={TextField}
                    name="amount"
                    label="Amount"
                    variant="outlined"
                    type="number"
                    fullWidth
                />
            </div>
            <div>
                <Field
                    as={FormControl}
                    name="timeframe"
                    variant="outlined"
                    fullWidth
                >
                    <InputLabel>Timeframe</InputLabel>
                    <Select label="Timeframe">
                        {timeframes.map((option:any) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                </Field>
            </div>
        </>
    )
}

export default AddEditIncomeFormFields;