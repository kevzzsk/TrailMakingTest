import React, { Component } from 'react'

import { Grid, Paper, Typography, Button, ButtonGroup } from '@material-ui/core'
import { Link } from 'react-router-dom'

import Steppers from "./Steppers"
class SideBar extends Component {

    static defaultProps={
        activeStep: 0,
        test: false,
        id: 0,
        heading:"",
        instruction:"",
        expIndex:0,
        data: ""
    }

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
                        <Steppers activeStep={this.props.activeStep}/>
                            <Grid item >
                                <ButtonGroup>
                                    <Button variant="text" className="mr-1" size="large" onClick={()=> this.props.goBack()} >Cancel</Button>
                                    <Link to={{
                                        pathname: this.getPath(this.props),
                                        state: {
                                            experimentID: this.props.id,
                                            expIndex: this.props.test ? this.props.expIndex : this.props.expIndex + 1,
                                            payload: this.props.data,
                                            activeStep:this.props.activeStep+1
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