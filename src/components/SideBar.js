import React, { Component } from 'react'

import { Grid, Paper, Typography, Button, ButtonGroup } from '@material-ui/core'
import { Link } from 'react-router-dom'

import Steppers from "./Steppers"


/**
 * Side bar of Experiment which displays relevant information about the experiment
 */
class SideBar extends Component {

    static defaultProps={
        activeStep: 0,
        test: false,
        id: 0,
        heading:"SAMPLE PART A",
        description:"THIS IS NOT PART OF THE EXPERIMENT!\n\nThere are numbers in circles on this page.\nPlease click on the circles from one number to the next, in order. Start at 1 , then go to 2 , then go to 3 , and so on.\nWork as quickly and accurately as you can.\n\nAt the end of the test please click on CONTINUE button",
        expIndex:0,
        data: "",
        participantDetails: {},
        trail: []
    }

    /**
     * @method
     * @param {*} props 
     * @description Get next routing route
     * @returns {string} Return pathname String
     */
    getPath = (props) => {
        if (props.test === true) {
            return "/experiment"
        } else if (props.expIndex >= props.trail.length-1) {
            return "/submission"
        } else {
            return "/experiment"
        }
    }


    render() {
        const {trail,expIndex,test,heading,description} = this.props
        return (
            <div className="h-100">
                <Grid container spacing={0} direction="column" justify="space-between" alignItems="stretch" className="h-100">
                    <Grid item>
                        <Grid container spacing={2} direction="column" justify="center" alignItems="stretch" className="nested-grid-top">
                            <Grid item >
                                <Paper className="p-4 mt-3 mx-3">
                                    <Typography variant="h5">Experiment ID: {test ? "TEST" : this.props.id}</Typography>
                                </Paper>
                            </Grid>
                            <Grid item >
                                <Paper className="p-4 mx-3">
                                    <Typography variant="h4">{test? heading : trail[expIndex].heading}</Typography>
                                    <br />
                                    <Typography variant="h5" style={{fontWeight:"600"}}>Instructions:</Typography>
                                    <Typography variant="body2" style={{ whiteSpace: "pre-wrap", fontSize:"20px" }}>{test? description: trail[expIndex].description}</Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item className="w-100 mb-4">
                        <Grid container spacing={0} direction="row" justify="center" alignItems="center" className="nested-grid-bot">
                        <Steppers trails={trail} activeStep={this.props.activeStep}/>
                            <Grid item >
                                <ButtonGroup>
                                    <Button variant="text" className="mr-1" size="large" onClick={()=> this.props.goBack()} >Cancel</Button>
                                    <Link to={{
                                        pathname: this.getPath(this.props),
                                        state: {
                                            experimentID: this.props.id,
                                            doctorID:this.props.doctorID,
                                            expIndex: test ? expIndex : expIndex + 1,
                                            payload: this.props.data,
                                            activeStep:this.props.activeStep+1,
                                            participantDetails:this.props.participantDetails,
                                            trail:trail
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