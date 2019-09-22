import React, { Component } from 'react'

import { Grid, Paper, Typography, Button, ButtonGroup } from '@material-ui/core'
import {Link} from 'react-router-dom'

class SideBar extends Component {
    render() {
        return (
            <div className="h-100">
                <Grid container spacing={0} direction="column" justify="space-between" alignItems="stretch" className="h-100">
                    <Grid item>
                        <Grid container spacing={2} direction="column" justify="center" alignItems="stretch" className="nested-grid-top">
                            <Grid item >
                                <Paper className="p-4 mt-3 mx-3">
                                    <Typography variant="h5">Experiment ID: {this.props.id}</Typography>
                                </Paper>
                            </Grid>
                            <Grid item >
                                <Paper className="p-4 mx-3">
                                    <Typography variant="h5">Instructions:</Typography>
                                    <Typography variant="body1">Loren Ipsum</Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item className="w-100 mb-4">
                        <Grid container spacing={0} direction="row" justify="center" alignItems="center" className="nested-grid-bot">
                            <Grid item >
                                <ButtonGroup>
                                    <Link to="/"><Button variant="text" className="mr-1" size="large" >Cancel</Button></Link>
                                    <Link to={{
                                        pathname:this.props.expIndex >= 1? "/completion":"/experiment",
                                        state: {
                                            experimentID:this.props.id,
                                            expIndex:this.props.expIndex+1,
                                        }
                                    }}><Button variant="contained">Continue</Button></Link>
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