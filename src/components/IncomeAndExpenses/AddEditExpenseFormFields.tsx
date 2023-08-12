import { Grid, TextField, MenuItem, FormControlLabel, Switch } from "@mui/material"
import { timeframes } from "../../timeframes"
import CurrencyInput from "../CurrencyInput"


interface IAddEditExpenseFormFieldsProps {
    formik: any
}

const AddEditExpenseFormFields = (props:IAddEditExpenseFormFieldsProps) => {
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
                <CurrencyInput
                    fullWidth
                    variant="outlined"
                    id="amount"
                    name="amount"
                    label="Amount"
                    onBlur={props.formik.handleBlur}
                    error={props.formik.touched.amount && Boolean(props.formik.errors.amount)}
                    helperText={props.formik.touched.amount && props.formik.errors.amount}
                    onChange={props.formik.handleChange}
                    value={props.formik.values.amount}
                />
                {/* <TextField
                    fullWidth
                    variant="outlined"
                    type="number"
                    id="amount"
                    name="amount"
                    label="Amount"
                    value={props.formik.values.amount}
                    onChange={props.formik.handleChange}
                    onBlur={props.formik.handleBlur}
                    error={props.formik.touched.amount && Boolean(props.formik.errors.amount)}
                    helperText={props.formik.touched.amount && props.formik.errors.amount}
                /> */}
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
            </Grid>
        </Grid>
    )
}

export default AddEditExpenseFormFields