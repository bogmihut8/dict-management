import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import './DictList.scss';

function DictList() {
  return (
    <Grid container className="dict-grid">
        <Grid item xs={12} className="dict-row">
            <Paper>xs=12</Paper>
        </Grid>
    </Grid>
  );
}

export default DictList;