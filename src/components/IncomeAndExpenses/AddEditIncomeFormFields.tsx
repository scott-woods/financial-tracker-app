import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useRef, useState } from "react";
import CurrencyInput from "react-currency-input-field";
import { timeframes } from "../../timeframes";

interface IAddEditIncomeFormFieldsProps {
    income?: any
    isEditing: boolean
    formik: any
}

const AddEditIncomeFormFields = (props:IAddEditIncomeFormFieldsProps) => {

    //const [amountValue, setAmountValue] = useState("")

    const handleAmountChanged = (event:any) => {
        // let inputValue = event.target.value
        // let numericValue = parseFloat(inputValue)

        // if (numericValue) {
        //     numericValue = numericValue / 100
        //     alert(numericValue)
        //     const formattedValue = numericValue.toFixed(2)
        //     setAmountValue(formattedValue)
        //     //props.formik.setFieldValue("amount", formattedValue)
        // }
    }
    
    return (
        <Grid container padding={2} spacing={4}>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    variant="outlined"
                    id="name"
                    name="name"
                    label="Name"
                    value={props.formik.values.name}
                    onChange={props.formik.handleChange}
                    onBlur={props.formik.handleBlur}
                    error={props.formik.touched.name && Boolean(props.formik.errors.name)}
                    helperText={props.formik.touched.name && props.formik.errors.name}
                />
            </Grid>
            <Grid item xs={12}>
                {/* <CurrencyInput
                    allowNegativeValue={false}
                    fixedDecimalLength={2}
                    value={props.formik.values.amount}
                    onValueChange={props.formik.handleChange}
                    prefix="$"
                    disableAbbreviations={true}
                    maxLength={12}
                    id="amount"
                    name="amount"
                /> */}
                <TextField
                    fullWidth
                    variant="outlined"
                    type="number"
                    id="amount"
                    name="amount"
                    label="Amount"
                    value={props.formik.values.amount}
                    onChange={(event) => {
                            props.formik.handleChange(event)
                            handleAmountChanged(event)
                        }
                    }
                    onBlur={props.formik.handleBlur}
                    error={props.formik.touched.amount && Boolean(props.formik.errors.amount)}
                    helperText={props.formik.touched.amount && props.formik.errors.amount}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    select
                    variant="outlined"
                    id="timeframe"
                    name="timeframe"
                    value={parseInt(props.formik.values.timeframe)}
                    label="Timeframe"
                    onChange={(e) => {
                        props.formik.handleChange(e)
                        props.formik.setFieldValue("timeframe", e.target.value)
                    }}
                    onBlur={props.formik.handleBlur}
                    error={props.formik.touched.timeframe && Boolean(props.formik.errors.timeframe)}
                    helperText={props.formik.touched.timeframe && props.formik.errors.timeframe}
                >
                    {timeframes.map((option:any) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                {/* <Field
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
                </Field> */}
            </Grid>
        </Grid>
    )
}

export default AddEditIncomeFormFields;