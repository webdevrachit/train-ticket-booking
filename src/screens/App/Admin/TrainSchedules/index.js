import React, { useState, useEffect, useRef, Dispatch } from 'react';
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Grid, Switch, TextField, Button, Box, Tooltip, Table, TableHead, TableBody, TableRow, TableCell } from 'components/Muicore';
import { Delete, Edit, Add, List } from 'components/Muiicons';
import { useForm, Controller } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";

import AppStyle from "mytheme/AppStyle";

import { DocumentHead, CircleLoader, CustomDialog, Card, CardHeader, CardBody, CustomButton } from 'components/';

import { AdminActions, CommonActions } from 'store/actions';

const TrainSchedules = () => {
  const classes = AppStyle();
  let refForm = useRef(null);
  const history = useHistory();
  const params = useParams();

  const common = useSelector((state) => state.common);
  
  const [modalOpened, setModalOpen] = React.useState(false);
  const [modalType, setModalType] = useState('add');
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
      _getallschedules();
  },[]);

  function _getallschedules (){
    AdminActions.getTrainSchedules(params.trainid).then((res)=>{
      // console.log("res", res);
      if(res.status==200 && res.data.length){
        setTableData(res.data);
      }
    });
  }

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
                    <CustomButton onClick={() => history.push({pathname: "/manage-train/0",state: null})} color="warning" size="sm" xsDownIcon>
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
                  <TableCell>Date</TableCell>
                  <TableCell>1AC</TableCell>
                  <TableCell>2AC</TableCell>
                  <TableCell>3AC</TableCell>
                  <TableCell>SL</TableCell>
                  <TableCell>GEN</TableCell>
                  <TableCell>Ladies</TableCell>
                  <TableCell>Tatkal</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  tableData.length ? 
                  tableData.map((train,key)=>{
                    return (<TableRow key={key}>
                      <TableCell>{train.trainNo}</TableCell>
                      <TableCell>{train.trainName}</TableCell>
                      <TableCell>{train.date}</TableCell>
                      <TableCell>{train.ac1}</TableCell>
                      <TableCell>{train.ac2}</TableCell>
                      <TableCell>{train.ac3}</TableCell>
                      <TableCell>{train.sl}</TableCell>
                      <TableCell>{train.general}</TableCell>
                      <TableCell>{train.ladies}</TableCell>
                      <TableCell>{train.tatkal}</TableCell>
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
        </Card>
       }
    </>
  )
}

export default TrainSchedules
