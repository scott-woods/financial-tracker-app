import { Clear } from "@mui/icons-material";
import { Box, Button, Fab, FormControlLabel, Grid, Paper, Stack, TextField } from "@mui/material";
import axios from "axios"
import { Field, FieldArray, FormikProvider, useFormik } from "formik"
import { useEffect, useState } from "react"
import * as Yup from "yup";

interface IDebtsEditorProps {
    debts: any[]
    setDebts: any
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
                <Button color="primary" variant="contained" sx={{marginY:2}} onClick={handleUpdateClicked}>
                    Update
                </Button>
            )}
            {isEditing && (
                <form onSubmit={formik.handleSubmit}>
                    <Stack direction="row" spacing={2} sx={{marginY:2}}>
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
                                <Grid container spacing={2} padding={2}>
                                    {formik.values.debts.map((debt:any, index:any) => (
                                        <Grid item xs={12} key={index}>
                                            <Grid container spacing={2} wrap="nowrap">
                                                <Field
                                                    type="hidden"
                                                    name={`debts.${index}.id`}
                                                />
                                                <Grid item flexGrow={4}>
                                                    <Field
                                                        name={`debts.${index}.name`}
                                                        as={TextField}
                                                        label="Name"
                                                        disabled={!isEditing}
                                                    />
                                                </Grid>
                                                <Grid item flexGrow={2}>
                                                    <Field
                                                        name={`debts.${index}.amount`}
                                                        as={TextField}
                                                        label="Amount"
                                                        type="number"
                                                        disabled={!isEditing}
                                                    />
                                                </Grid>
                                                {isEditing && (
                                                    <Grid item flexGrow={0} alignSelf="center">
                                                        <Fab size="small" color="error" onClick={() => remove(index)}>
                                                            <Clear />
                                                        </Fab>
                                                    </Grid>
                                                )}
                                            </Grid>
                                        </Grid>
                                    ))}
                                    <Grid item xs={12}>
                                        <Button color="primary" variant="outlined" disabled={!isEditing} onClick={() => push({ name: '', amount: 0 })}>
                                            Add
                                        </Button>
                                    </Grid>
                                </Grid>
                            )}
                        </FieldArray>
                    </FormikProvider>
                </Box>
            </Paper>
        </Box>
    )
}

export default DebtsEditor