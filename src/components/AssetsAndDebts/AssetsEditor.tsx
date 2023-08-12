import { Grid, Typography, Button, Paper, Box, Stack, TextField, Switch, FormControlLabel, Fab } from "@mui/material"
import { ErrorMessage, Field, FieldArray, Form, Formik, FormikProvider, getIn, useFormik } from "formik"
import { useEffect, useState } from "react"
import ConfirmDeleteModal from "../ConfirmDeleteModal"
import axios from "axios"
import { Clear } from "@mui/icons-material"
import * as Yup from "yup";
import CurrencyInput from "../CurrencyInput"

interface IAssetsEditorProps {
    assets: IAssetFields[]
    setAssets: any
    addNetWorthReport: any
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
                        <FieldArray name="assets">
                            {({ insert, remove, push }) => (
                                <Box display="flex" flexDirection="column" padding={2} gap={2}>
                                    {formik.values.assets.map((asset:any, index:any) => {
                                        const name = `assets.${index}.name`
                                        const touchedName = getIn(formik.touched, name)
                                        const errorName = getIn(formik.errors, name)

                                        const value = `assets.${index}.value`
                                        const touchedValue = getIn(formik.touched, value)
                                        const errorValue = getIn(formik.errors, value)
                                        return (
                                            <Box display="flex" gap={2}>
                                                <Field
                                                    type="hidden"
                                                    name={`assets.${index}.id`}
                                                />
                                                <TextField
                                                    sx={{flexGrow:1}}
                                                    disabled={!isEditing}
                                                    name={name}
                                                    value={asset.name}
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
                                                <CurrencyInput
                                                    sx={{flexGrow:1}}
                                                    disabled={!isEditing}
                                                    variant="outlined"
                                                    name={value}
                                                    label="Value"
                                                    onBlur={formik.handleBlur}
                                                    error={Boolean(touchedValue && errorValue)}
                                                    helperText={
                                                        touchedValue && errorValue
                                                            ? errorValue
                                                            : ""
                                                    }
                                                    onChange={formik.handleChange}
                                                    value={asset.value}
                                                />
                                                {/* <TextField
                                                    sx={{flexGrow:1}}
                                                    disabled={!isEditing}
                                                    name={value}
                                                    value={asset.value}
                                                    label="Value"
                                                    helperText={
                                                        touchedValue && errorValue
                                                            ? errorValue
                                                            : ""
                                                    }
                                                    error={Boolean(touchedValue && errorValue)}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                /> */}
                                                <FormControlLabel
                                                    sx={{alignSelf:"flex-start"}}
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
                                                {isEditing && (
                                                    <Fab size="small" color="error" onClick={() => remove(index)}>
                                                        <Clear />
                                                    </Fab>
                                                )}
                                            </Box>
                                        )
                                    })}
                                    <Box display="flex">
                                        <Button color="primary" variant="outlined" disabled={!isEditing} onClick={() => push({ name: '', value: 0 })}>
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

export default AssetsEditor