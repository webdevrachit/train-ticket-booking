import React, { useState, useEffect, useRef, Dispatch } from 'react';
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Grid, Switch, TextField, Button, Box, Tooltip, Table, TableHead, TableBody, TableRow, TableCell } from 'components/Muicore';
import { Delete, Edit, Add, List, AttachMoney } from 'components/Muiicons';
import { useForm, Controller } from "react-hook-form";
import { useHistory } from "react-router-dom";

import AppStyle from "mytheme/AppStyle";
import ManageForm from "./ManageForm";

import { DocumentHead, CircleLoader, CustomDialog, Card, CardHeader, CardBody, CustomButton } from 'components/';

import { AdminActions, CommonActions } from 'store/actions';

const TrainList = () => {
  const classes = AppStyle();
  let refForm = useRef(null);
  const history = useHistory();

  const common = useSelector((state) => state.common);
  
  const [modalOpened, setModalOpen] = React.useState(false);
  const [modalType, setModalType] = useState('add');
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
      _getalltrains();
  },[]);

  function _getalltrains (){
    AdminActions.getAllTrains().then((res)=>{
      if(res.status==200 && res.data.length){
        setTableData(res.data);
      }
    });
  }

  function deleteTrain(id) {
    let confrm = window.confirm("Are you sure want to delete Train?");
    if(confrm){
      AdminActions.deleteTrain({id:id, type:'delete'}).then((res)=>{
        // console.log("res", res);
        if(res.status==200){
          CommonActions.showSnackbar({open:true, color: 'success', message: 'Removed Successfully'});
        }
      });
    }
  }

  function updateData() {}

  function modalOpen(row, type) {}

  function modalClose() { setModalOpen(false); }


  return (
    <>
      <DocumentHead title='Train List' />
      {
        common.showSubLoader ?
          <CircleLoader />
        :
        <Card>
          <CardHeader color="primary">
            <Grid container justify="space-between">
              <Grid item>
                <Typography variant="h4">
                  Train List
                </Typography>
              </Grid>
                <Grid item>
                  <Tooltip title="Add New Train">
                    <CustomButton onClick={() => history.push({pathname: "/train-manage/0",state: null})} color="warning" size="sm" xsDownIcon>
                      <Add /> <span>Add New</span>
                    </CustomButton>
                  </Tooltip>
                </Grid>
            </Grid>
          </CardHeader>
          <CardBody style={{overflowY: 'auto'}}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>No</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Origin</TableCell>
                  <TableCell>Destination</TableCell>
                  <TableCell>Depature</TableCell>
                  <TableCell>Arrival</TableCell>
                  <TableCell>1AC</TableCell>
                  <TableCell>2AC</TableCell>
                  <TableCell>3AC</TableCell>
                  <TableCell>SL</TableCell>
                  <TableCell>GEN</TableCell>
                  <TableCell style={{minWidth:200}}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  tableData.length ? 
                  tableData.map((train,key)=>{
                    return (<TableRow key={key}>
                      <TableCell>{train.trainNo}</TableCell>
                      <TableCell>{train.trainName}</TableCell>
                      <TableCell>{train.origin}</TableCell>
                      <TableCell>{train.destination}</TableCell>
                      <TableCell>{train.depature}</TableCell>
                      <TableCell>{train.arrival}</TableCell>
                      <TableCell>{train.ac1}</TableCell>
                      <TableCell>{train.ac2}</TableCell>
                      <TableCell>{train.ac3}</TableCell>
                      <TableCell>{train.sl}</TableCell>
                      <TableCell>{train.general}</TableCell>
                      <TableCell>
                        <Tooltip title="Edit Train">
                          <CustomButton
                            justIcon
                            color="secondary"
                            onClick={()=>history.push({pathname: "/train-manage/"+train._id,state: train})}
                            className={classNames(classes.tblActionBtn, classes.mr1)}
                          >
                            <Edit />
                          </CustomButton>
                        </Tooltip>
                        <Tooltip title="Train Fairs">
                          <CustomButton
                            justIcon
                            color="secondary"
                            onClick={()=>history.push({pathname: "/train-fare/"+train._id,state: train})}
                            className={classNames(classes.tblActionBtn, classes.mr1)}
                          >
                            <AttachMoney />
                          </CustomButton>
                        </Tooltip>
                        <Tooltip title="Train Schedule">
                          <CustomButton
                            justIcon
                            color="secondary"
                            onClick={()=>history.push({pathname: "/train-schedules/"+train._id,state: train})}
                            className={classNames(classes.tblActionBtn, classes.mr1)}
                          >
                            <List />
                          </CustomButton>
                        </Tooltip>
                        <Tooltip title="Delete Train">
                          <CustomButton
                            justIcon
                            color="danger"
                            onClick={()=> deleteTrain(train._id)}
                            className={classes.tblActionBtn}
                          >
                            <Delete />
                          </CustomButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>);
                  })
                  :
                  <TableRow>
                    <TableCell colSpan={14} align="center">
                      No trains found
                    </TableCell>
                  </TableRow>
                }
              </TableBody>
            </Table>
          </CardBody>
          <CustomDialog 
            options={{
              title: modalType=='add' ? "Add Train": "Update Train",
              okay: modalType=='add' ? 'Add' : 'Update'
            }}
            open={modalOpened} 
            onClose={modalClose} 
            onSubmit={() => { refForm.current.dispatchEvent(new Event("submit")) }}
          >
          <ManageForm 
            refForm={refForm} 
            updateData={updateData} 
            editData={{}} 
           />
          </CustomDialog>
        </Card>
       }
    </>
  )
}

export default TrainList
