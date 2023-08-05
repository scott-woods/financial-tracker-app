import { Box, CircularProgress, Typography } from "@mui/material";
import { useRef, useEffect } from "react";

interface ICircularProgressWithLabelProps {
    value: number,
    text: string
}

const CircularProgressWithLabel = (props:ICircularProgressWithLabelProps) => {

    const circleRef = useRef<any | null | undefined>(null)
    const textRef = useRef<any | null | undefined>(null)

    useEffect(() => {
        const circleSize = circleRef.current.offsetWidth
        const textSize = textRef.current.offsetWidth

        const scaleFactor = circleSize / textSize
        const fontSize = Math.floor(parseFloat(window.getComputedStyle(textRef.current).fontSize) * scaleFactor)

        textRef.current.style.fontSize = `${fontSize}px`
    }, [props.text])

    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }} alignItems={'center'} ref={circleRef}>
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
                ref={textRef}
                >
                    {props.text}
                </Typography>
            </Box>
        </Box>
    )
}

export default CircularProgressWithLabel;