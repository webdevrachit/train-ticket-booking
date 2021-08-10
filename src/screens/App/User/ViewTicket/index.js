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

const ViewTicket = () => {
  const classes = AppStyle();
  const history = useHistory();
  const location = useLocation();
  const params = useParams();
  const state = location.state;
  console.log("state", state);

  const common = useSelector((state) => state.common);
  const user = useSelector((state) => state.user);
  const { handleSubmit, control, errors, register } = useForm({});

  const [ticketData, setTrainData] = useState(state);

  return (
    <>
      <DocumentHead title='View Ticket' />
      {
        common.showSubLoader ?
          <CircleLoader />
        :
        <Card>
          <CardHeader color="primary">
            <Grid container justify="space-between">
              <Grid item>
                <Typography variant="h4">
                  Ticket Details
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
              <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={6}>
                  Train Number: <strong>{ticketData.trainNo}</strong>
                </Grid>
                <Grid item xs={12} md={6}>
                  Train Name: <strong>{ticketData.trainName}</strong>
                </Grid>
              </Grid>
              <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={6}>
                  Origin: <strong>{ticketData.origin}</strong>
                </Grid>
                <Grid item xs={12} md={6}>
                  Destination: <strong>{ticketData.destination}</strong>
                </Grid>
              </Grid>
              <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={4}>
                  Journey Date: <strong>{ticketData.doj}</strong>
                </Grid>
                <Grid item xs={12} md={4}>
                  Depature: <strong>{ticketData.depature}</strong>
                </Grid>
                <Grid item xs={12} md={4}>
                  Arrival: <strong>{ticketData.arrival}</strong>
                </Grid>
              </Grid>
               <Grid container justify="space-between">
                <Grid item>
                  <Typography variant="h4" className={classes.mt2}>Passengers</Typography>
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
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      ticketData.passengers.map((pass,key) =>{
                        return(
                        <TableRow key={key}>
                          <TableCell>{pass.name}</TableCell>
                          <TableCell>{pass.age}</TableCell>
                          <TableCell>{pass.sex}</TableCell>
                          <TableCell>{pass.birth}</TableCell>
                          <TableCell>{ticketData.status}</TableCell>
                        </TableRow>
                        )
                      })
                    }
                  </TableBody>
                </Table>
              </Grid>
          </CardBody>
        </Card>
       }
    </>
  )
}

export default ViewTicket
