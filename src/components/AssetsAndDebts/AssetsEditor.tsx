import { Grid, Typography, Button, Paper, Box, Stack, TextField, Switch, FormControlLabel, Fab } from "@mui/material"
import { ErrorMessage, Field, FieldArray, Form, Formik, FormikProvider, getIn, useFormik } from "formik"
import { useEffect, useState } from "react"
import ConfirmDeleteModal from "../ConfirmDeleteModal"
import axios from "axios"
import { Clear } from "@mui/icons-material"
import * as Yup from "yup";

interface IAssetsEditorProps {
    assets: IAssetFields[]
    setAssets: any
}

interface IAssetsFormFields {
    assets: IAssetFields[]
}

interface IAssetFields {
    id: number
    name: string
    value: number
    isLiquid: boolean
}

const defaultValues : IAssetsFormFields = {
    assets: []
}

const validationSchema = Yup.object().shape({
    assets: Yup.array()
        .of(
            Yup.object().shape({
                name: Yup.string().required("Name is Required"),
                value: Yup.number().required("Value is Required").min(0, "Value must be greater than 0")
            })
        )
})

const AssetsEditor = (props:IAssetsEditorProps) => {

    const [isEditing, setIsEditing] = useState(false)

    useEffect(() => {
        if (props.assets.length > 0) {
            let newValues : IAssetsFormFields = { assets: [...props.assets]}
            formik.setValues(newValues)
        }
        else {
            formik.setValues(defaultValues)
        }
    }, [props.assets])

    const handleUpdateClicked = () => {
        setIsEditing(true)
    }

    const handleCancelClicked = () => {
        formik.setValues({ assets: [...props.assets]})
        setIsEditing(false)
    }

    const handleSubmit = async (values:any) => {
        try {
            await axios
                .post(`/api/v1/Assets`, values.assets)
                .then((res:any) => {
                    if (res.data) {
                        props.setAssets(values.assets)
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
                        <FieldArray name="assets">
                            {({ insert, remove, push }) => (
                                <Grid container spacing={2} padding={2}>
                                    {formik.values.assets.map((asset:any, index:any) => (
                                        <Grid item xs={12} key={index}>
                                            <Grid container spacing={2} wrap="nowrap">
                                                <Field
                                                    type="hidden"
                                                    name={`assets.${index}.id`}
                                                />
                                                <Grid item flexGrow={4}>
                                                    <Field
                                                        name={`assets.${index}.name`}
                                                        placeholder="Asset Name"
                                                        as={TextField}
                                                        label="Name"
                                                        disabled={!isEditing}
                                                    />
                                                </Grid>
                                                <Grid item flexGrow={2}>
                                                    <Field
                                                        name={`assets.${index}.value`}
                                                        placeholder="Asset Value"
                                                        as={TextField}
                                                        label="Value"
                                                        type="number"
                                                        disabled={!isEditing}
                                                    />
                                                </Grid>
                                                <Grid item alignSelf="center" flexGrow={0}>
                                                    <FormControlLabel
                                                        control={
                                                            <Field
                                                                label="Liquid"
                                                                name={`assets.${index}.isLiquid`}
                                                                as={Switch}
                                                                checked={formik.values.assets[index].isLiquid}
                                                                disabled={!isEditing}
                                                            />
                                                        }
                                                        label="Liquid"
                                                        labelPlacement="top"
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
                                        <Button color="primary" variant="outlined" disabled={!isEditing} onClick={() => push({ name: '', value: 0 })}>
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

export default AssetsEditor