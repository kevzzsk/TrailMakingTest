import React, { Component } from 'react'

import { Grid, Paper, Typography, Button, ButtonGroup } from '@material-ui/core'
import { Link } from 'react-router-dom'

class SideBar extends Component {

    getPath = (props) => {
        if (props.test === true) {
            return "/experiment"
        } else if (props.expIndex >= 1) {
            return "/completion"
        } else {
            return "/experiment"
        }
    }



    render() {
        return (
            <div className="h-100">
                <Grid container spacing={0} direction="column" justify="space-between" alignItems="stretch" className="h-100">
                    <Grid item>
                        <Grid container spacing={2} direction="column" justify="center" alignItems="stretch" className="nested-grid-top">
                            <Grid item >
                                <Paper className="p-4 mt-3 mx-3">
                                    <Typography variant="h5">Experiment ID: {this.props.test ? "TEST" : this.props.id}</Typography>
                                </Paper>
                            </Grid>
                            <Grid item >
                                <Paper className="p-4 mx-3">
                                    <Typography variant="h4">{this.props.heading}</Typography>
                                    <br />
                                    <Typography variant="h5">Instructions:</Typography>
                                    <Typography variant="body2" style={{ whiteSpace: "pre-wrap" }}>{this.props.instruction}</Typography>
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
                                        pathname: this.getPath(this.props),
                                        state: {
                                            experimentID: this.props.id,
                                            expIndex: this.props.test ? this.props.expIndex : this.props.expIndex + 1,
                                            payload: this.props.data
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