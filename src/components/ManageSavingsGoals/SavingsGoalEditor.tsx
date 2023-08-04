import { Box, Input, Slider, Stack, TextField, Typography } from "@mui/material";

const SavingsGoalEditor = () => {
    return (
        <Box height="100%" padding={2} display="flex" flexDirection="column" justifyContent="center">
            <Typography variant="h6">
                Savings Goal
            </Typography>
            <Stack direction="row" spacing={2}>
                <Slider
                    sx={{width:"50%"}}
                    min={0}
                    max={10000}
                    step={250}
                    defaultValue={500}
                    valueLabelDisplay="auto"
                />
                
            </Stack>
        </Box>
        // <Box height="100%" padding={2} display="flex" justifyContent="flex-start" alignItems="center">
        //     <Stack width="100%">
        //         <Box display="flex">
        //             <Typography variant="h6">
        //                 Savings Goal
        //             </Typography>
        //         </Box>
        //         <Box display="flex" justifyContent="flex-start">
        //             <Slider
        //                 sx={{width:"50%"}}
        //                 min={0}
        //                 max={10000}
        //                 step={250}
        //                 defaultValue={500}
        //                 valueLabelDisplay="auto"
        //             />
        //             <Input
        //                 size="small"
        //             />
        //         </Box>
        //     </Stack>
            
        // </Box>
    )
}

export default SavingsGoalEditor;