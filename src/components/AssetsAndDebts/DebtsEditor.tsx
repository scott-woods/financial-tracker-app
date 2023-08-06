import { Clear } from "@mui/icons-material";
import { Box, Button, Fab, FormControlLabel, Grid, Paper, Stack, TextField } from "@mui/material";
import axios from "axios"
import { Field, FieldArray, FormikProvider, getIn, useFormik } from "formik"
import { useEffect, useState } from "react"
import * as Yup from "yup";

interface IDebtsEditorProps {
    debts: any[]
    setDebts: any
    addNetWorthReport: any
}

interface IDebtFields {
    id: number
    name: string
    amount: number
}
interface IDebtsFormFields {
    debts: IDebtFields[]
}

const defaultValues : IDebtsFormFields = {
    debts: []
}

const validationSchema = Yup.object().shape({
    debts: Yup.array()
        .of(
            Yup.object().shape({
                name: Yup.string().required("Name is Required"),
                amount: Yup.number().required("Amount is Required").min(0, "Amount must be greater than 0")
            })
        )
})

const DebtsEditor = (props:IDebtsEditorProps) => {
    
    const [isEditing, setIsEditing] = useState(false)

    useEffect(() => {
        if (props.debts.length > 0) {
            let newValues : IDebtsFormFields = { debts: [...props.debts]}
            formik.setValues(newValues)
        }
        else {
            formik.setValues(defaultValues)
        }
    }, [props.debts])

    const handleUpdateClicked = () => {
        setIsEditing(true)
    }

    const handleCancelClicked = () => {
        formik.setValues({ debts: [...props.debts]})
        setIsEditing(false)
    }

    const handleSubmit = async (values:any) => {
        try {
            await axios
                .post(`/api/v1/Debts`, values.debts)
                .then((res:any) => {
                    if (res.data) {
                        props.setDebts(values.debts)
                        props.addNetWorthReport()
                    }
                })
        }
        catch (error:any) {
            console.error('Error:', error)
        }
        finally {
            setIsEditing(false)
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
        <Box padding={2} height="100%" display="table" width="100%">
            {!isEditing && (
                <Button color="primary" variant="contained" sx={{marginBottom:2}} onClick={handleUpdateClicked}>
                    Update
                </Button>
            )}
            {isEditing && (
                <form onSubmit={formik.handleSubmit}>
                    <Stack direction="row" spacing={2} sx={{marginBottom:2}}>
                        <Button color="error" variant="outlined" onClick={handleCancelClicked}>
                            Cancel
                        </Button>
                        <Button color="primary" variant="contained" type="submit">Save Changes</Button>
                    </Stack>
                </form>
            )}
            <Paper elevation={6} sx={{display:"table-row", width:"100%", height:"100%", position:"relative"}}>
                <Box position="absolute" sx={{overflowY:"auto", left:0, top:0, right:0, bottom:0}}>
                    <FormikProvider value={formik}>
                        <FieldArray name="debts">
                            {({ insert, remove, push }) => (
                                <Box display="flex" flexDirection="column" padding={2} gap={2}>
                                    {formik.values.debts.map((debt:any, index:any) => {
                                        const name = `debts.${index}.name`
                                        const touchedName = getIn(formik.touched, name)
                                        const errorName = getIn(formik.errors, name)

                                        const amount = `debts.${index}.amount`
                                        const touchedAmount = getIn(formik.touched, amount)
                                        const errorAmount = getIn(formik.errors, amount)
                                        return (
                                            <Box display="flex" gap={2}>
                                                <Field
                                                    type="hidden"
                                                    name={`debts.${index}.id`}
                                                />
                                                <TextField
                                                    sx={{flexGrow:1}}
                                                    disabled={!isEditing}
                                                    name={name}
                                                    value={debt.name}
                                                    label="Name"
                                                    helperText={
                                                        touchedName && errorName
                                                            ? errorName
                                                            : ""
                                                    }
                                                    error={Boolean(touchedName && errorName)}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                />
                                                <TextField
                                                    sx={{flexGrow:1}}
                                                    disabled={!isEditing}
                                                    name={amount}
                                                    value={debt.amount}
                                                    label="Amount"
                                                    helperText={
                                                        touchedAmount && errorAmount
                                                            ? errorAmount
                                                            : ""
                                                    }
                                                    error={Boolean(touchedAmount && errorAmount)}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                />
                                                {isEditing && (
                                                    <Fab size="small" color="error" onClick={() => remove(index)}>
                                                        <Clear />
                                                    </Fab>
                                                )}
                                            </Box>
                                        )
                                    })}
                                    <Box display="flex">
                                        <Button color="primary" variant="outlined" disabled={!isEditing} onClick={() => push({ name: '', amount: 0 })}>
                                            Add
                                        </Button>
                                    </Box>
                                </Box>
                            )}
                        </FieldArray>
                    </FormikProvider>
                </Box>
            </Paper>
        </Box>
    )
}

export default DebtsEditor