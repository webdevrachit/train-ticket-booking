import React, { useState, useEffect, useRef, Dispatch } from 'react';
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Grid, Switch, TextField, Button, Box, Tooltip, Table, TableHead, TableBody, TableRow, TableCell } from 'components/Muicore';
import { Delete, Edit, Add, List, AttachMoney } from 'components/Muiicons';
import { useForm, Controller } from "react-hook-form";
import { useHistory } from "react-router-dom";
import moment from "moment";

import AppStyle from "mytheme/AppStyle";

import { DocumentHead, CircleLoader, CustomDialog, Card, CardHeader, CardBody, CustomButton } from 'components/';

import { UserActions, CommonActions } from 'store/actions';

const TrainSearch = () => {
  const classes = AppStyle();
  const history = useHistory();

  const common = useSelector((state) => state.common);
  const { handleSubmit, control, errors } = useForm({});
  
  const [tableData, setTableData] = useState([]);
  const [searchData, setSearchData] = useState({});

  function searchTrain(data) {
    data.date = moment(data.date).format('DD-MM-YYYY');
    // console.log("data", data);
    UserActions.searchTrain(data).then((res)=>{
      // console.log("res", res);
      if(res.status==200){
        setSearchData(res.data);
      }else{
        CommonActions.showSnackbar({open:true, color: 'danger', message: 'No Trains found.'});
      }
    });
  }

  return (
    <>
      <DocumentHead title='Train List' />
        <Card>
          <CardHeader color="primary">
            <Grid container justify="space-between">
              <Grid item>
                <Typography variant="h4">
                  Search Train
                </Typography>
              </Grid>
            </Grid>
          </CardHeader>
          <CardBody style={{overflowY: 'auto'}}>
          <form onSubmit={handleSubmit(searchTrain)}>
            <Grid container justify="space-between" alignItems="center">
              <Grid item xs={12} md={3}>
                From: 
                <Controller
                  as={
                    <TextField />
                  }
                  margin="dense"
                  type="text"
                  placeholder="Place"
                  variant="outlined"
                  name="origin"
                  defaultValue={searchData.origin||''}
                  control={control}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                To: 
                <Controller
                  as={
                    <TextField />
                  }
                  margin="dense"
                  type="text"
                  placeholder="Place"
                  variant="outlined"
                  name="destination"
                  defaultValue={searchData.destination||''}
                  control={control}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                Date: 
                <Controller
                  as={
                    <TextField />
                  }
                  margin="dense"
                  type="date"
                  placeholder="Jouney Date"
                  variant="outlined"
                  name="date"
                  defaultValue={searchData.date||''}
                  control={control}
                />
              </Grid>
              <Grid item xs={12} md={3} justify="center">
                <CustomButton
                  type="submit"
                  color="secondary"
                  className={classes.mt1}
                >
                  Search
                </CustomButton>
              </Grid>
            </Grid>
          </form>
           {
            common.showSubLoader ?
              <CircleLoader />
            :
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
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  searchData.length ? 
                  searchData.map((train,key)=>{
                    let available = train.seats_available ? train.seats_available[0] : {};
                    return (<TableRow key={key}>
                      <TableCell>{train.trainNo}</TableCell>
                      <TableCell>{train.trainName}</TableCell>
                      <TableCell>{train.origin}</TableCell>
                      <TableCell>{train.destination}</TableCell>
                      <TableCell>{train.depature}</TableCell>
                      <TableCell>{train.arrival}</TableCell>
                      <TableCell align="center">
                        {available.ac1}<br />
                        <CustomButton
                            size="sm" bordered
                            color="secondary"
                            onClick={()=>history.push({pathname: "/book-ticket/ac1",state: train})}
                            className={classNames(classes.tblActionBtn)}
                          >Book
                        </CustomButton>
                      </TableCell>
                      <TableCell align="center">
                        {available.ac2}<br />
                        <CustomButton
                            size="sm" bordered
                            color="secondary"
                            onClick={()=>history.push({pathname: "/book-ticket/ac2",state: train})}
                            className={classNames(classes.tblActionBtn)}
                          >Book
                        </CustomButton>
                      </TableCell>
                      <TableCell align="center">
                        {available.ac3}<br />
                        <CustomButton
                            size="sm" bordered
                            color="secondary"
                            onClick={()=>history.push({pathname: "/book-ticket/ac3",state: train})}
                            className={classNames(classes.tblActionBtn)}
                          >Book
                        </CustomButton>
                      </TableCell>
                      <TableCell align="center">
                        {available.sl}<br />
                        <CustomButton
                            size="sm" bordered
                            color="secondary"
                            onClick={()=>history.push({pathname: "/book-ticket/sl",state: train})}
                            className={classNames(classes.tblActionBtn)}
                          >Book
                        </CustomButton>
                      </TableCell>
                      <TableCell align="center">
                        {available.general}<br />
                        <CustomButton
                            size="sm" bordered
                            color="secondary"
                            onClick={()=>history.push({pathname: "/book-ticket/general",state: train})}
                            className={classNames(classes.tblActionBtn)}
                          >Book
                        </CustomButton>
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
            }
          </CardBody>
        </Card>
    </>
  )
}

export default TrainSearch
