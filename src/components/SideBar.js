import React, { Component } from 'react'

import { Grid, Paper, Typography, Button, ButtonGroup } from '@material-ui/core'

class SideBar extends Component {
    render() {
        return (
            <div className="h-100">
                <Grid container spacing={0} direction="column" justify="space-between" alignItems="stretch" className="h-100">
                    <Grid item>
                        <Grid container spacing={2} direction="column" justify="center" alignItems="stretch" className="nested-grid-top">
                            <Grid item >
                                <Paper className="p-4 mt-3 mx-3">
                                    <Typography variant="h5">Experiment ID: 1231212</Typography>
                                </Paper>
                            </Grid>
                            <Grid item >
                                <Paper className="p-4 mx-3">
                                    <Typography variant="h5">Instructions:</Typography>
                                    <Typography variant="p">Loren Ipsum</Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item className="w-100 mb-4">
                        <Grid container spacing={0} direction="row" justify="center" alignItems="center" className="nested-grid-bot">
                            <Grid item >
                                <ButtonGroup fullWidth size="large">
                                    <Button variant="text" >Cancel</Button>
                                    <Button variant="contained">Continue</Button>

                                </ButtonGroup>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default SideBar;