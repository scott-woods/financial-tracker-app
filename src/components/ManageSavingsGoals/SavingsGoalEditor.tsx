import { Box, Button, Input, Slider, Stack, TextField, Typography } from "@mui/material";
import { currencyFormatter } from "../../tools/currencyFormatter";
import { useRef, useState } from "react";
import axios from "axios";


interface ISavingsGoalEditorProps {
    userMetadata:any
    setUserMetadata:any
    savingsGoal:number
    setSavingsGoal:any
    totalRecurringIncome:number
    totalRecurringExpenses:number
    isEditing:boolean
    setIsEditing:any
}

const SavingsGoalEditor = (props:ISavingsGoalEditorProps) => {

    const getMax = () => {
        return props.totalRecurringIncome - props.totalRecurringExpenses
    }

    const getStep = () => {
        let max = getMax()
        let divided = max / 30
        let rounded = Math.round(divided / 50) * 50
        let step = rounded
        return step
    }

    const handleSavingsGoalChange = (event: Event, value:any, activeThumb:number) => {
        props.setSavingsGoal(value)
    }

    const handleUpdateClicked = () => {
        props.setIsEditing(true)
    }

    const handleCancelClicked = () => {
        props.setIsEditing(false)
        props.setSavingsGoal(props.userMetadata.savingsGoal)
    }

    const handleSaveClicked = async () => {
        try {
            await axios
                .put(`/api/v1/Users/?newSavingsGoal=${props.savingsGoal}`)
                .then((res:any) => {
                    if (res.data) {
                        props.setUserMetadata((prevData:any) => ({
                            ...prevData,
                            savingsGoal: props.savingsGoal
                        }))
                    }
                })
        }
        catch (error) {
            console.log(error)
        }
        finally {
            props.setIsEditing(false)
        }
    }

    return (
        <Box display="flex" flexDirection="column" alignItems="center">
            <Box width="100%" display="flex" justifyContent="space-between">
                <Typography variant="h6">
                    Liquid Monthly Savings Goal
                </Typography>
                <Stack direction="row" spacing={2}>
                    {!props.isEditing && (
                        <Button variant="outlined" color="primary" onClick={handleUpdateClicked}>
                            Update
                        </Button>
                    )}
                    {props.isEditing && (
                        <>
                            <Button variant="contained" color="primary" onClick={handleSaveClicked}>
                                Save Changes
                            </Button>
                            <Button variant="contained" color="error" onClick={handleCancelClicked}>
                                Cancel
                            </Button>
                        </>
                    )}
                </Stack>
            </Box>
            <Typography variant="h1" fontWeight="bold">
                {currencyFormatter(props.savingsGoal)}
            </Typography>
            <Slider
                sx={{width:"50%"}}
                disabled={!props.isEditing}
                min={0}
                max={getMax()}
                step={getStep()}
                value={props.savingsGoal}
                onChange={handleSavingsGoalChange}
                defaultValue={500}
                valueLabelDisplay="auto"
            />
        </Box>
    )
}

export default SavingsGoalEditor;