import React, { useState, useEffect, useRef, Dispatch } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Typography, Grid, Switch, TextField, Button, Box, Tooltip } from 'components/Muicore';
import { Delete, Edit, Add} from 'components/Muiicons';
import { useForm, Controller } from "react-hook-form";
import { useHistory, useLocation, useParams } from "react-router-dom";
import moment from "moment";

import AppStyle from "mytheme/AppStyle";
import Msg from "config/ValidationMessages";

import { DocumentHead, CircleLoader, CustomDialog, Card, CardHeader, CardBody, CustomButton} from 'components/';

import { AdminActions, CommonActions } from 'store/actions';

const TrainList = () => {
  const classes = AppStyle();
  const history = useHistory();
  const location = useLocation();
  const params = useParams();

  const common = useSelector((state) => state.common);
  const { handleSubmit, control, errors } = useForm({});

  let _train = {
    _id: '',
    trainNo: '',
    trainName: '',
    origin: '',
    destination: '',
    depature: '',
    arrival: '',
    ac1: '',
    ac2: '',
    ac3: '',
    sl: '',
    general: '',
    ladies: '',
    tatkal: '',
  }
  _train = params.trainid !=0 ? location.state : _train;
  const [trainData, setTrainData] = useState(_train);

  function updateData(data) {
    data.type = params.trainid !=0 ? 'edit' : 'add';
    data._id = params.trainid;
    AdminActions.manageTrains(data).then((res)=>{
      // console.log("res", res);
      if(res.status==200){
        // Temporary code
        if(data.type=='add'){
          let train = res.data, allSchedules=[],
          schedule = {
            trainId: train._id,
            trainNo: train.trainNo,
            trainName: train.trainName,
            date: '',
            ac1: train.ac1,
            ac2: train.ac2,
            ac3: train.ac3,
            sl: train.sl,
            general: train.general,
            ladies: train.ladies,
            tatkal: train.tatkal,
          };

          for(let s=0; s<50; s++){
            schedule.date = moment().add(s,'days').format('DD-MM-YYYY');
            allSchedules.push({...schedule});
          }

          AdminActions.dummyCreateSeatsAvilability({schedules: JSON.stringify(allSchedules)}).then((r)=>{
            // console.log("r", r);

          });
        }
        CommonActions.showSnackbar({open:true, color: 'success', message: 'Updated Successfully'});
        history.goBack();
      }else{
        CommonActions.showSnackbar({open:true, color: 'danger', message: 'Not Updated'});
      }

    })
  }


  return (
    <>
      <DocumentHead title='Train List' />
      {
        // common.showMainLoader ?
        //   <CircleLoader />
        // :
        <Card>
          <CardHeader color="primary">
            <Grid container justify="space-between">
              <Grid item>
                <Typography variant="h4">
                  {params.trainid !=0 ?  "Edit Train": "Add Train"}
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
            <form onSubmit={handleSubmit(updateData)}>
              <Grid container spacing={0} alignItems="center">
                <Grid item xs={12} md={4}>
                  Train Number *
                </Grid>
                <Grid item xs={12} md={8}>
                  <Controller
                    as={
                      <TextField />
                    }
                    autoFocus
                    fullWidth
                    error={errors.trainNo ? true:false}
                    helperText={errors.trainNo && errors.trainNo.message} 
                    rules={{...Msg.required}}
                    margin="dense"
                    type="number"
                    variant="outlined"
                    placeholder="No"
                    name="trainNo"
                    defaultValue={trainData.trainNo}
                    control={control}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  Train Name *
                </Grid>
                <Grid item xs={12} md={8}>
                  <Controller
                    as={
                      <TextField />
                    }
                    fullWidth
                    error={errors.trainName ? true:false}
                    helperText={errors.trainName && errors.trainName.message} 
                    rules={{...Msg.required}}
                    margin="dense"
                    type="text"
                    variant="outlined"
                    placeholder="Name"
                    name="trainName"
                    defaultValue={trainData.trainName}
                    control={control}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  Origin *
                </Grid>
                <Grid item xs={12} md={8}>
                  <Controller
                    as={
                      <TextField />
                    }
                    fullWidth
                    error={errors.origin ? true:false}
                    helperText={errors.origin && errors.origin.message} 
                    rules={{...Msg.required}}
                    margin="dense"
                    type="text"
                    variant="outlined"
                    placeholder="Origin"
                    name="origin"
                    defaultValue={trainData.origin}
                    control={control}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  Destination *
                </Grid>
                <Grid item xs={12} md={8}>
                  <Controller
                    as={
                      <TextField />
                    }
                    fullWidth
                    error={errors.destination ? true:false}
                    helperText={errors.destination && errors.destination.message} 
                    rules={{...Msg.required}}
                    margin="dense"
                    type="text"
                    variant="outlined"
                    placeholder="Destination"
                    name="destination"
                    defaultValue={trainData.destination}
                    control={control}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  Depature *
                </Grid>
                <Grid item xs={12} md={8}>
                  <Controller
                    as={
                      <TextField />
                    }
                    fullWidth
                    error={errors.depature ? true:false}
                    helperText={errors.depature && errors.depature.message} 
                    rules={{...Msg.required}}
                    margin="dense"
                    type="text"
                    variant="outlined"
                    placeholder="Depature"
                    name="depature"
                    defaultValue={trainData.depature}
                    control={control}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  Arrival *
                </Grid>
                <Grid item xs={12} md={8}>
                  <Controller
                    as={
                      <TextField />
                    }
                    fullWidth
                    error={errors.arrival ? true:false}
                    helperText={errors.arrival && errors.arrival.message} 
                    rules={{...Msg.required}}
                    margin="dense"
                    type="text"
                    variant="outlined"
                    placeholder="Arrival"
                    name="arrival"
                    defaultValue={trainData.arrival}
                    control={control}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  1AC (No of seats)
                </Grid>
                <Grid item xs={12} md={8}>
                  <Controller
                    as={
                      <TextField />
                    }
                    fullWidth
                    margin="dense"
                    type="number"
                    placeholder="Seats"
                    variant="outlined"
                    name="ac1"
                    defaultValue={trainData.ac1}
                    control={control}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  2AC (No of seats)
                </Grid>
                <Grid item xs={12} md={8}>
                  <Controller
                    as={
                      <TextField />
                    }
                    fullWidth
                    margin="dense"
                    type="number"
                    placeholder="Seats"
                    variant="outlined"
                    name="ac2"
                    defaultValue={trainData.ac2}
                    control={control}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  3AC (No of seats)
                </Grid>
                <Grid item xs={12} md={8}>
                  <Controller
                    as={
                      <TextField />
                    }
                    fullWidth
                    margin="dense"
                    type="number"
                    placeholder="Seats"
                    variant="outlined"
                    name="ac3"
                    defaultValue={trainData.ac3}
                    control={control}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  SL (No of seats)
                </Grid>
                <Grid item xs={12} md={8}>
                  <Controller
                    as={
                      <TextField />
                    }
                    fullWidth
                    margin="dense"
                    type="number"
                    placeholder="Seats"
                    variant="outlined"
                    name="sl"
                    defaultValue={trainData.sl}
                    control={control}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  General (No of seats)
                </Grid>
                <Grid item xs={12} md={8}>
                  <Controller
                    as={
                      <TextField />
                    }
                    fullWidth
                    margin="dense"
                    type="number"
                    placeholder="Seats"
                    variant="outlined"
                    name="general"
                    defaultValue={trainData.general}
                    control={control}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={0} justify="center">
                <CustomButton
                  type="submit"
                  color="secondary"
                >
                  {params.trainid !=0 ? "Update Train" :"Add Train" }
                </CustomButton>
              </Grid>
              </form>
          </CardBody>
        </Card>
       }
    </>
  )
}

export default TrainList
