import { PowerSettingsNew } from "@mui/icons-material";
import {
    Button,
    Stack,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide,
} from "@mui/material";
import React, { useState } from "react";
import PropTypes from "prop-types";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const EstimatesFooter = ({
                             sessionId = "a23389cc",
                             buttonLabel = "End session",
                             onClick = () => {},
                         }) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = () => {
        setOpen(false);
        onClick();
    };

    return (
        <Stack justifyContent={"flex-start"} justifySelf={"flex-end"} spacing={2}>
            <Typography
                variant="caption"
                fontSize={"0.8rem"}
                sx={{ fontFamily: "'Source Sans Pro', sans-serif", marginBottom: "0.5rem" }}
            >
                Session ID: {sessionId}
            </Typography>
            <Button
                variant="outlined"
                size="small"
                color="error"
                startIcon={<PowerSettingsNew />}
                onClick={handleClickOpen}
                sx={{
                    fontFamily: "'Source Sans Pro', sans-serif",
                    padding: "0.5rem 1rem",
                }}
            >
                {buttonLabel}
            </Button>

            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle
                    sx={{
                        backgroundColor: "#004259",
                        color: "white",
                        fontWeight: "bold",
                        fontFamily: "'Source Sans Pro', sans-serif",
                        padding: "1rem 1rem",
                    }}
                >
                    Are you sure?
                </DialogTitle>
                <DialogContent
                    sx={{
                        padding: "1.5rem 1.5rem 0.5rem",
                        marginTop: "1rem",
                    }}
                >
                    <DialogContentText
                        id="alert-dialog-slide-description"
                        sx={{
                            fontFamily: "'Source Sans Pro', sans-serif",
                            fontSize: "1rem",
                            color: "#333",
                        }}
                    >
                        Do you really want to end the session? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions
                    sx={{
                        justifyContent: "center",
                        padding: "1rem",
                    }}
                >
                    <Button
                        onClick={handleClose}
                        sx={{
                            backgroundColor: "white",
                            color: "#CAD400",
                            fontFamily: "'Source Sans Pro', sans-serif",
                            padding: "0.5rem 2rem",
                            borderRadius: "8px",
                            fontWeight: "bold",
                            border: "2px solid #CAD400",
                            "&:hover": {
                                backgroundColor: "#f9f9f9",
                            },
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleConfirm}
                        sx={{
                            backgroundColor: "white",
                            color: "red",
                            fontFamily: "'Source Sans Pro', sans-serif",
                            padding: "0.5rem 2rem",
                            borderRadius: "8px",
                            fontWeight: "bold",
                            border: "2px solid red",
                            "&:hover": {
                                backgroundColor: "#ffe6e6",
                            },
                        }}
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </Stack>
    );
};

EstimatesFooter.propTypes = {
    sessionId: PropTypes.string.isRequired,
    buttonLabel: PropTypes.string,
    onClick: PropTypes.func.isRequired,
};
export default EstimatesFooter;
