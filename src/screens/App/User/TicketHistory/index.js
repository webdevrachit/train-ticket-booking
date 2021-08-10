import React, { useState, useEffect, useRef, Dispatch } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Typography, Grid, Switch, TextField, Button, Box, Tooltip, Divider, Table, TableHead, TableBody, TableRow, TableCell, Select, MenuItem } from 'components/Muicore';
import { Delete, Edit, Visibility} from 'components/Muiicons';
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { useHistory, useLocation, useParams } from "react-router-dom";
import moment from "moment";

import AppStyle from "mytheme/AppStyle";
import Msg from "config/ValidationMessages";

import { DocumentHead, CircleLoader, CustomDialog, Card, CardHeader, CardBody, CustomButton} from 'components/';

import { UserActions, CommonActions } from 'store/actions';

const TicketHistory = () => {
  const classes = AppStyle();
  const history = useHistory();
  const location = useLocation();

  const common = useSelector((state) => state.common);
  const user = useSelector((state) => state.user);
  const { handleSubmit, control, errors, register } = useForm({});

  const [ticketData, setTicketData] = useState([]);

  useEffect(() => {
      _getalltickets();
  },[]);

  function _getalltickets (){
    UserActions.getAllTickets(user.id).then((res)=>{
      console.log("res", res);
      if(res.status==200){
        setTicketData(res.data);
      }
    });
  }

  return (
    <>
      <DocumentHead title='Ticket History' />
      {
        common.showSubLoader ?
          <CircleLoader />
        :
        <Card>
          <CardHeader color="primary">
            <Grid container justify="space-between">
              <Grid item>
                <Typography variant="h4">
                  Ticket History
                </Typography>
              </Grid>
            </Grid>
          </CardHeader>
          <CardBody style={{overflowY: 'auto'}}>
            {
            common.showSubLoader ?
              <CircleLoader />
            :
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>PNR No</TableCell>
                  <TableCell>DOJ</TableCell>
                  <TableCell>Train No</TableCell>
                  <TableCell>Train Name</TableCell>
                  <TableCell>From</TableCell>
                  <TableCell>To</TableCell>
                  <TableCell>Depature</TableCell>
                  <TableCell>Arrival</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  ticketData.length ? 
                  ticketData.map((ticket,key)=>{
                    return (<TableRow key={key}>
                      <TableCell>{ticket.ticketNo}</TableCell>
                      <TableCell>{ticket.doj}</TableCell>
                      <TableCell>{ticket.trainNo}</TableCell>
                      <TableCell>{ticket.trainName}</TableCell>
                      <TableCell>{ticket.origin}</TableCell>
                      <TableCell>{ticket.destination}</TableCell>
                      <TableCell>{ticket.depature}</TableCell>
                      <TableCell>{ticket.arrival}</TableCell>
                      <TableCell>{ticket.status}</TableCell>
                      <TableCell>
                        <Tooltip title="View Ticket">
                          <CustomButton
                            justIcon
                            color="secondary"
                            onClick={()=>history.push({pathname: "/view-ticket/"+ticket._id,state: ticket})}
                            className={classes.tblActionBtn}
                          >
                            <Visibility />
                          </CustomButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>);
                  })
                  :
                  <TableRow>
                    <TableCell colSpan={14} align="center">
                      No tickets found
                    </TableCell>
                  </TableRow>
                }
              </TableBody>
            </Table>
            }
          </CardBody>
        </Card>
       }
    </>
  )
}

export default TicketHistory
