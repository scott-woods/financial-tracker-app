import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack } from "@mui/material"

interface IConfirmDeleteModalProps {
    show: boolean
    title?: string
    message?: string
    handleConfirm: any
    handleClose: any
}

const ConfirmDeleteModal = (props:IConfirmDeleteModalProps) => {
    return (
        <Dialog open={props.show} maxWidth="sm" fullWidth>
            <DialogTitle>
                {props.title || "Confirm Delete"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {props.message || "Are you sure you want to Delete?"}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Stack direction="row" spacing={2} paddingBottom={2} paddingRight={2}>
                    <Button color="primary" variant="outlined" onClick={props.handleClose}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="contained" color="error" onClick={props.handleConfirm}>
                        Confirm
                    </Button>
                </Stack>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmDeleteModal;