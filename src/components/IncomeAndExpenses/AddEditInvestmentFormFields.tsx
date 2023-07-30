import { Grid, TextField, MenuItem, FormControlLabel, Switch } from "@mui/material"
import { timeframes } from "../../timeframes"


interface IAddEditInvestmentFormFieldsProps {
    formik: any
}

const AddEditInvestmentFormFields = (props:IAddEditInvestmentFormFieldsProps) => {
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
                <TextField
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
            </Grid>
            <Grid item xs={12}>
                <FormControlLabel
                    control={
                        <Switch
                            name="isFromLiquid"
                            value={props.formik.values.isFromLiquid}
                            onChange={props.formik.handleChange}
                            onBlur={props.formik.handleBlur}
                            checked={props.formik.values.isFromLiquid}
                        />
                    }
                    label="Is From Liquid"
                />
            </Grid>
        </Grid>
    )
}

export default AddEditInvestmentFormFields