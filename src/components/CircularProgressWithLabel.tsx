import { Box, CircularProgress, Typography } from "@mui/material";

interface ICircularProgressWithLabelProps {
    value: number,
    text: string
}

const CircularProgressWithLabel = (props:ICircularProgressWithLabelProps) => {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }} alignItems={'center'}>
            <CircularProgress variant="determinate" value={props.value} size={125} thickness={5.5} />
            <Box
                sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                }}
            >
                <Typography
                variant="h5"
                component="div"
                >
                    {props.text}
                </Typography>
            </Box>
        </Box>
    )
}

export default CircularProgressWithLabel;