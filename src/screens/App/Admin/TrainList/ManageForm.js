import React, { useState, useEffect, useRef } from 'react'
import { Grid, Select, MenuItem, TextField, Switch } from 'components/Muicore';
import { useForm, Controller } from "react-hook-form";

import Msg from "config/ValidationMessages";

const ManageForm = ({refForm, updateData, editData}) =>{
  const { handleSubmit, control, errors } = useForm({});

  return (
    <form ref={refForm} onSubmit={handleSubmit(updateData)}>
            <Grid container spacing={0} alignItems="center">
              <Grid item xs={12} md={4}>
                Train Name *
              </Grid>
              <Grid item xs={12} md={8}>
                <Controller
                  as={
                    <TextField />
                  }
                  autoFocus
                  fullWidth
                  error={errors.name ? true:false}
                  helperText={errors.name && errors.name.message} 
                  rules={{...Msg.required}}
                  margin="dense"
                  type="text"
                  variant="outlined"
                  placeholder="Name"
                  name="name"
                  defaultValue={editData.name}
                  control={control}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                Description
              </Grid>
              <Grid item xs={12} md={8}>
                <Controller
                  as={
                    <TextField />
                  }
                  fullWidth
                  margin="dense"
                  type="text"
                  variant="outlined"
                  placeholder="Description"
                  name="description"
                  defaultValue={editData.description}
                  control={control}
                />
              </Grid>
            </Grid>
            </form>
  )
}

export default ManageForm