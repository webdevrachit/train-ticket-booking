import React from 'react';
import { Grid, CircularProgress } from 'components/Muicore';

const CircleLoader = () => {
  return (
	<Grid container alignItems="center" justify="center" style={{ minHeight: '70vh' }}>
		<CircularProgress color='secondary'/>
	</Grid>
    )
}

export default CircleLoader
