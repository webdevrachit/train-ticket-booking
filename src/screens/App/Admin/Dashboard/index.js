import React from 'react';
import { useSelector } from "react-redux";
import { Typography, Grid, Button, Divider } from 'components/Muicore';

import AppStyle from "mytheme/AppStyle";

import { DocumentHead, CircleLoader, Card, CardHeader, CardBody, CustomButton} from 'components/';

import { UserActions, CommonActions } from 'store/actions';

const Dashboard = () => {
  const classes = AppStyle();

  const common = useSelector((state) => state.common);

  return (
    <>
      <DocumentHead title='Dashboard' />
      {
        common.showSubLoader ?
          <CircleLoader />
        :
        <Card>
          <CardHeader color="primary">
            <Grid container justify="space-between">
              <Grid item>
                <Typography variant="h4">
                  Admin Dashboard
                </Typography>
              </Grid>
            </Grid>
          </CardHeader>
          <CardBody style={{overflowY: 'auto'}}>
              
          </CardBody>
        </Card>
       }
    </>
  )
}

export default Dashboard
