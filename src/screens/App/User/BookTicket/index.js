import React, { useState, useEffect, useRef, Dispatch } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Typography, Grid, Switch, TextField, Button, Box, Tooltip, Divider, Table, TableHead, TableBody, TableRow, TableCell, Select, MenuItem } from 'components/Muicore';
import { Delete, Edit, Add} from 'components/Muiicons';
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { useHistory, useLocation, useParams } from "react-router-dom";
import moment from "moment";

import AppStyle from "mytheme/AppStyle";
import Msg from "config/ValidationMessages";

import { DocumentHead, CircleLoader, CustomDialog, Card, CardHeader, CardBody, CustomButton} from 'components/';

import { UserActions, CommonActions } from 'store/actions';

const BookTicket = () => {
  const classes = AppStyle();
  const history = useHistory();
  const location = useLocation();
  const params = useParams();
  const state = location.state;

  const common = useSelector((state) => state.common);
  const user = useSelector((state) => state.user);
  const { handleSubmit, control, errors, register } = useForm({});

  const _pass = { name: '', age:'', sex:'Male', birth:'Upper'};
  const [trainData, setTrainData] = useState(state);
  const [adults, setAdults] = useState([_pass]);

  const { fields, append, prepend, remove } = useFieldArray({
    control,
    name: "passengers"
  });

  function bookTicket(data) {
    data.trainNo = trainData.trainNo ;
    data.trainName = trainData.trainName ;
    data.origin = trainData.origin ;
    data.destination = trainData.destination ;
    data.doj = trainData.seats_available['0'].date ;
    data.depature = trainData.depature ;
    data.arrival = trainData.arrival ;
    data.userId = user.id ;
    UserActions.bookTicket({data: JSON.stringify(data)}).then((res)=>{
      // console.log("res", res);
      if(res.status==200){
        CommonActions.showSnackbar({open:true, color: 'success', message: 'Booked Successfully'});
        history.push("/ticket-history/")
      }else{
        CommonActions.showSnackbar({open:true, color: 'danger', message: 'Not Booked'});
      }

    })
  }


  return (
    <>
      <DocumentHead title='Train Fare' />
      {
        common.showSubLoader ?
          <CircleLoader />
        :
        <Card>
          <CardHeader color="primary">
            <Grid container justify="space-between">
              <Grid item>
                <Typography variant="h4">
                  Manage Train Fare
                </Typography>
              </Grid>
              <Grid item>
                <CustomButton onClick={() => history.goBack()} color="secondary" size="sm" xsDownIcon>
                      Back
                    </CustomButton>
              </Grid>
            </Grid>
          </CardHeader>
          <CardBody style={{overflowY: 'auto'}}>
            <form onSubmit={handleSubmit(bookTicket)}>
              <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={6}>
                  Train Number: <strong>{trainData.trainNo}</strong>
                </Grid>
                <Grid item xs={12} md={6}>
                  Train Name: <strong>{trainData.trainName}</strong>
                </Grid>
              </Grid>
              <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={6}>
                  Origin: <strong>{trainData.origin}</strong>
                </Grid>
                <Grid item xs={12} md={6}>
                  Destination: <strong>{trainData.destination}</strong>
                </Grid>
              </Grid>
              <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={4}>
                  Journey Date: <strong>{trainData.seats_available['0'].date}</strong>
                </Grid>
                <Grid item xs={12} md={4}>
                  Depature: <strong>{trainData.depature}</strong>
                </Grid>
                <Grid item xs={12} md={4}>
                  Arrival: <strong>{trainData.arrival}</strong>
                </Grid>
              </Grid>
               <Grid container justify="space-between">
                <Grid item>
                  <Typography variant="h4" className={classes.mt2}>Passengers</Typography>
                </Grid>
                <Grid item>
                  <Tooltip title="Add Passenger">
                    <CustomButton
                      color="warning"
                      size="sm"
                      onClick={()=> append(_pass)}
                    >
                      <Add /> Add Passenger
                    </CustomButton>
                  </Tooltip>
                </Grid>
              </Grid>
              <Divider />
              <Grid container spacing={0} alignItems="center" className={classes.mt2}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Age</TableCell>
                      <TableCell>Sex</TableCell>
                      <TableCell>Birth</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      fields.map((item, index) => {
                        let _err = errors.passengers ? errors.passengers[index] :{};
                        return (<TableRow key={index}>
                          <TableCell>
                            <Controller
                              as={
                                <TextField />
                              }
                              margin="dense"
                              error={_err.name ? true:false}
                              helperText={_err.name && _err.name.message} 
                              rules={{...Msg.required}}
                              type="text"
                              placeholder="Name"
                              variant="outlined"
                              name={`passengers[${index}].name`}
                              defaultValue={item.name}
                              control={control}
                            />
                          </TableCell>
                          <TableCell>
                            <Controller
                              as={
                                <TextField />
                              }
                              margin="dense"
                              error={_err.age ? true:false}
                              helperText={_err.age && _err.age.message} 
                              rules={{...Msg.required}}
                              type="number"
                              placeholder="Age"
                              variant="outlined"
                              name={`passengers[${index}].age`}
                              defaultValue={item.age}
                              control={control}
                            />
                          </TableCell>
                          <TableCell>
                            <Controller
                              as={
                                <Select>
                                  <MenuItem value={'Male'}>Male</MenuItem>
                                  <MenuItem value={'Female'}>Female</MenuItem>
                                  <MenuItem value={'Transgender'}>Trans Gender</MenuItem>
                                </Select>
                              }
                              margin="dense"
                              error={_err.sex ? true:false}
                              helperText={_err.sex && _err.sex.message} 
                              rules={{...Msg.required}}
                              type="text"
                              placeholder="Sex"
                              variant="outlined"
                              name={`passengers[${index}].sex`}
                              defaultValue={item.sex}
                              control={control}
                            />
                          </TableCell>
                          <TableCell>
                            <Controller
                              as={
                                <Select>
                                  <MenuItem value={'Upper'}>Upper</MenuItem>
                                  <MenuItem value={'Middle'}>Middle</MenuItem>
                                  <MenuItem value={'Lower'}>Lower</MenuItem>
                                  <MenuItem value={'SideLower'}>Side Lower</MenuItem>
                                  <MenuItem value={'SideUpper'}>Side Upper</MenuItem>
                                </Select>
                              }
                              margin="dense"
                              error={_err.birth ? true:false}
                              helperText={_err.birth && _err.birth.message} 
                              rules={{...Msg.required}}
                              type="text"
                              placeholder="Birth"
                              variant="outlined"
                              name={`passengers[${index}].birth`}
                              defaultValue={item.birth}
                              control={control}
                            />
                          </TableCell>
                          <TableCell>
                            <Tooltip title="Remove Passenger">
                              <CustomButton
                                justIcon
                                color="danger"
                                onClick={()=> remove(index)}
                                className={classes.tblActionBtn}
                              >
                                <Delete />
                              </CustomButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>)
                      })
                    }
                  </TableBody>
                </Table>
              </Grid>
              <Grid container spacing={0} justify="center">
                <CustomButton
                  type="submit"
                  color="secondary"
                  className={classes.mt1}
                >
                  Book Ticket
                </CustomButton>
              </Grid>
              </form>
          </CardBody>
        </Card>
       }
    </>
  )
}

export default BookTicket
