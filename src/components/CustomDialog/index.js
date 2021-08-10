import React, {Dispatch} from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress
} from "../Muicore";
import CustomButton from "../CustomButton";
import { useDispatch, useSelector } from "react-redux";

const CustomDialogs: React.FC = ({
  open,
  options = {title:'',okay:'Okay',cancel:'Cancel'},
  description,
  onSubmit,
  maxWidth= 'sm',
  onClose,
  children
}) => {
  const common = useSelector((state) => state.common);
  const _onSubmit = () =>{
    if(common.showSubLoader) return;
    onSubmit();
  }
  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth={maxWidth=='false'? false: maxWidth}
      fullWidth={true}
      >
      {options.title ? <DialogTitle id="alert-dialog-title">{options.title}</DialogTitle> : null }
      <DialogContent>
        { description ? <DialogContentText>{description}</DialogContentText>:null}
        {children}
      </DialogContent>
      <DialogActions>
          <CustomButton color="transparent" onClick={onClose} autoFocus>
            {options.cancel || 'Cancel'}
          </CustomButton>
          {
            options.okay ?
            <CustomButton color="warning" onClick={_onSubmit} variant="contained">
              {common.showSubLoader? <CircularProgress size={15} color="inherit" style={{marginRight:10}}/>: null}{options.okay || 'Okay'}
            </CustomButton>
            :
            null
          }
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialogs;