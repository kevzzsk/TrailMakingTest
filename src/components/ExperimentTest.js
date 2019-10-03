
import React, { Component } from 'react';
import { Grid, Button } from '@material-ui/core';
import BubbleScreen from './BubbleScreen';
import SideBar from './SideBar';
import Trail from '../template/testTemplate';

class ExperimentTest extends Component {

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
        return (
            <div className="experiment-bg">
                <div className="item-exp">
                        <BubbleScreen trail={this.state.trail} />
                </div>
                <div className="item-side">
                    <SideBar id={this.props.location.state.experimentID} expIndex={this.state.expIndex} ready={this.state.ready} test={true} heading={Trail.experiment[0].heading} instruction={Trail.experiment[0].description}/>
                </div>
            </div>
        )
    }
}

export default ExperimentTest;