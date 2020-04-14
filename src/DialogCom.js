import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@material-ui/core";
const DialogCom = (props) => {
  return (
    <Dialog
      onClose={props.handleClose}
      aria-labelledby="customized-dialog-title"
      open={props.open}
    >
      <DialogTitle id="customized-dialog-title" onClose={props.handleClose}>
        Json Data
      </DialogTitle>
      <DialogContent dividers>{props.dialogContent}</DialogContent>
      <DialogActions>
        <Button autoFocus onClick={props.handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogCom;
