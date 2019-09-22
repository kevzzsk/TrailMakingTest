
import React, { Component } from 'react';
import { Grid, Button } from '@material-ui/core';
import BubbleScreen from './BubbleScreen';
import SideBar from './SideBar';
import Trail from '../template/template1';

class ExperimentPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            id: null,
            ready: false,
            expIndex: 0,
            trail: null
        }
    }

    componentDidMount() {
        console.log("DidMount")
        this.init()
    }

    componentDidUpdate(prevProps){
        console.log("DidUpdate")
        if (prevProps.location.key !== this.props.location.key){
            console.log("newKey")
            this.init()
        }
    }

    init = () => {
        const { experimentID, expIndex, } = this.props.location.state
        this.getTrail(experimentID, expIndex)
        this.setState({
            id: experimentID,
            expIndex,
        })    }

    getTrail = (id,expIndex) => {
        // TODO: search for trail using ID
        this.setState({ trail: Trail.experiment[expIndex] })
    }

    handleBegin = () => {
        this.setState(prevState => {
            return {
                ready: !prevState.ready
            }
        })
    }



    render() {
        return (
            <div className="experiment-bg">
                <div className="item-exp">
                    {this.state.ready ?
                        (<BubbleScreen trail={this.state.trail} />) :
                        (<Button variant="contained" size="large" className="mx-auto w-50 d-block button-wrapper" onClick={this.handleBegin}>
                            Begin
                        </Button>)
                    }
                </div>
                <div className="item-side">
                    <SideBar id={this.state.id} expIndex={this.state.expIndex} />
                </div>
            </div>
        )
    }
}

export default ExperimentPage;