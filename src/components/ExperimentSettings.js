import React, { Component } from 'react'

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';

import BubbleScreen from "./BubbleScreen"
import { Button } from '@material-ui/core';

class ExperimentSettings extends Component {


    constructor(props) {
        super(props)
        this.state = {
            expanded: ""
        }
    }

    handleChange = (panel) => (event, isExpanded) => {
        this.setState({
            expanded: isExpanded ? panel : false
        })
    }

    handleDoExperiment =(event) =>{
        this.props.history.push({
            pathname: '/form', state: {
                experimentID: this.props.data.experimentID,
                expIndex: 0,
                activeStep: 0,
                trails: this.props.data.templateExperiments
            }
        })
    }

    render() {
        return (
            <div className="m-3">
                <ExpansionPanel expanded={this.state.expanded === 'panel1'} onChange={this.handleChange('panel1')} TransitionProps={{unmountOnExit:true}} >
                    <ExpansionPanelSummary
                        expandIcon={<i className="fas fa-chevron-down" />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography >Trails Configuration</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <div className="vexp-settings-trail">
                            {this.props.data.templateExperiments.map(trail => {
                                return <div style={{border:"2px solid black"}}>
                                    <Typography>{trail.heading}</Typography>
                                    <BubbleScreen trail={trail} test={true} />
                                </div>
                            
                            })}
                        </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel expanded={this.state.expanded === 'panel2'} onChange={this.handleChange('panel2')}>
                    <ExpansionPanelSummary
                        expandIcon={<i className="fas fa-chevron-down" />}
                        aria-controls="panel2bh-content"
                        id="panel2bh-header"
                    >
                        <Typography >Charts Settings</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                            Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar
                            diam eros in elit. Pellentesque convallis laoreet laoreet.
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel expanded={this.state.expanded === 'panel3'} onChange={this.handleChange('panel3')}>
                    <ExpansionPanelSummary
                        expandIcon={<i className="fas fa-chevron-down" />}
                        aria-controls="panel3bh-content"
                        id="panel3bh-header"
                    >
                        <Typography>Advanced settings</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,
                            vitae egestas augue. Duis vel est augue.
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel expanded={this.state.expanded === 'panel4'} onChange={this.handleChange('panel4')}>
                    <ExpansionPanelSummary
                        expandIcon={<i className="fas fa-chevron-down" />}
                        aria-controls="panel4bh-content"
                        id="panel4bh-header"
                    >
                        <Typography className="">Do Experiment (Doctor)</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <div>
                            <Typography>
                                This is only for Doctor use to track the performance of their patient.
                            </Typography>
                            <Button onClick={this.handleDoExperiment} variant="contained" size="large">Do Experiment</Button>
                        </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        )
    }
}


export default ExperimentSettings