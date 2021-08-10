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
  const state = location.state;

  const common = useSelector((state) => state.common);
  const { handleSubmit, control, errors } = useForm({});

  useEffect(() => {
      _gettrainfare();
  },[]);

  function _gettrainfare (){
    AdminActions.getTrainInterList(params.trainid).then((res)=>{
      // console.log("res", res);
      if(res.status==200){
        if(res.data._id){
          setTrainData(res.data);
          setFareData(res.data);
          console.log("res.data", res.data);
        }
      }
    });
  }

  const [trainData, setTrainData] = useState(state);
  const [fareData, setFareData] = useState({});

  function updateData(data) {
    let _data = {...trainData, ...data};
    console.log("_data", _data);
    AdminActions.manageTrainInterList({data: JSON.stringify(_data)}).then((res)=>{
      // console.log("res", res);
      if(res.status==200){
        CommonActions.showSnackbar({open:true, color: 'success', message: 'Updated Successfully'});
        history.goBack();
      }else{
        CommonActions.showSnackbar({open:true, color: 'danger', message: 'Not Updated'});
      }

    })
  }


  return (
    <>
      <DocumentHead title='Train Fare' />
      {
        common.showSubLoader || Object.keys(fareData).length == 0 ?
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
            <form onSubmit={handleSubmit(updateData)}>
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
                  Origin: <strong>{trainData.stn1}</strong>
                </Grid>
                <Grid item xs={12} md={6}>
                  Destination: <strong>{trainData.stn2}</strong>
                </Grid>
              </Grid>
              <Grid container spacing={0} alignItems="center">
                <Grid item xs={12} md={4}>
                  1AC
                </Grid>
                <Grid item xs={12} md={4}>
                  <Controller
                    as={
                      <TextField />
                    }
                    fullWidth
                    margin="dense"
                    type="number"
                    placeholder="Normal Price"
                    variant="outlined"
                    name="ac1Price"
                    defaultValue={fareData.ac1Price}
                    control={control}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Controller
                    as={
                      <TextField />
                    }
                    fullWidth
                    margin="dense"
                    type="number"
                    placeholder="Tatkal Price"
                    variant="outlined"
                    name="ac1PriceTatkal"
                    defaultValue={fareData.ac1PriceTatkal}
                    control={control}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  2AC
                </Grid>
                <Grid item xs={12} md={4}>
                  <Controller
                    as={
                      <TextField />
                    }
                    fullWidth
                    margin="dense"
                    type="number"
                    placeholder="Normal Price"
                    variant="outlined"
                    name="ac2Price"
                    defaultValue={fareData.ac2Price}
                    control={control}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Controller
                    as={
                      <TextField />
                    }
                    fullWidth
                    margin="dense"
                    type="number"
                    placeholder="Tatkal Price"
                    variant="outlined"
                    name="ac2PriceTatkal"
                    defaultValue={fareData.ac2PriceTatkal}
                    control={control}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  3AC
                </Grid>
                <Grid item xs={12} md={4}>
                  <Controller
                    as={
                      <TextField />
                    }
                    fullWidth
                    margin="dense"
                    type="number"
                    placeholder="Normal Price"
                    variant="outlined"
                    name="ac3Price"
                    defaultValue={fareData.ac3Price}
                    control={control}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Controller
                    as={
                      <TextField />
                    }
                    fullWidth
                    margin="dense"
                    type="number"
                    placeholder="Tatkal Price"
                    variant="outlined"
                    name="ac3PriceTatkal"
                    defaultValue={fareData.ac3PriceTatkal}
                    control={control}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  SL
                </Grid>
                <Grid item xs={12} md={4}>
                  <Controller
                    as={
                      <TextField />
                    }
                    fullWidth
                    margin="dense"
                    type="number"
                    placeholder="Normal Price"
                    variant="outlined"
                    name="slPrice"
                    defaultValue={fareData.slPrice}
                    control={control}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Controller
                    as={
                      <TextField />
                    }
                    fullWidth
                    margin="dense"
                    type="number"
                    placeholder="Tatkal Price"
                    variant="outlined"
                    name="slPriceTatkal"
                    defaultValue={fareData.slPriceTatkal}
                    control={control}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  General
                </Grid>
                <Grid item xs={12} md={4}>
                  <Controller
                    as={
                      <TextField />
                    }
                    fullWidth
                    margin="dense"
                    type="number"
                    placeholder="Normal Price"
                    variant="outlined"
                    name="generalPrice"
                    defaultValue={fareData.generalPrice}
                    control={control}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Controller
                    as={
                      <TextField />
                    }
                    fullWidth
                    margin="dense"
                    type="number"
                    placeholder="Tatkal Price"
                    variant="outlined"
                    name="generalPriceTatkal"
                    defaultValue={fareData.generalPriceTatkal}
                    control={control}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={0} justify="center">
                <CustomButton
                  type="submit"
                  color="secondary"
                  className={classes.mt1}
                >
                  Update Fare
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
