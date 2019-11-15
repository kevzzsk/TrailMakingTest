
import React, { Component } from 'react';
import BubbleScreen from './BubbleScreen';
import SideBar from './SideBar';
import Trail from '../template/testTemplate';

/**
 * ExperimentTest handles the interactive part of the experiment
 * It renders the test experiment page
 * @param {*} props
 * 
 */
class ExperimentTest extends Component {

    static defaultProps={
        activeStep:1,
        location:{
            state:{
                experimentID:0,
                participantDetails:{}
            }
        }
    }

    /** @constructor */
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            ready: false,
            expIndex: 0,
            trail: Trail.experiment[0]
        }
    }
    render() {
        const {participantDetails, experimentID,activeStep,trail,doctorID} = this.props.location.state
        return (
            <div className="experiment-bg">
                <div className="item-exp">
                        <BubbleScreen trail={this.state.trail} />
                </div>
                <div className="item-side">
                    <SideBar goBack={this.props.history.goBack} doctorID={doctorID} trail={trail}  participantDetails={participantDetails}  activeStep={activeStep} id={experimentID} expIndex={this.state.expIndex} ready={this.state.ready} test={true}/>
                </div>
            </div>
        )
    }
}

export default ExperimentTest;