
import React, { Component,PureComponent } from 'react';
import { Grid, Button } from '@material-ui/core';
import BubbleScreen from './BubbleScreen';
import SideBar from './SideBar';
import Trail from '../template/template1';
import {Prompt } from 'react-router-dom'

class ExperimentPage extends PureComponent {

    static defaultProps ={
        activeStep:0
    }

    constructor(props) {
        super(props);
        this.state = {
            id: null,
            ready: false,
            expIndex: 0,
            trail: null,
            shouldBlock: true
        };
    }

    componentWillMount() {
        console.log("WillMount")
        this.init()
    }

    componentDidUpdate(prevProps) {
        console.log("DidUpdate")
        if (prevProps.location.key !== this.props.location.key) {
            console.log("newKey")
            this.init()
        }
    }

    init = () => {
        const { experimentID, expIndex } = this.props.location.state
        this.setState({
            id: experimentID,
            expIndex,
            ready: false,
            trail: Trail.experiment[expIndex].trail
        })
        if (this.props.location.state.payload){
            this.setState({
                data:this.props.location.state.payload
            })
        } else {
            this.setState({
                data:[]
            })
        }
    }

    handleBegin = () => {
        this.setState(prevState => {
            return {
                ready: !prevState.ready
            }
        })
    }

    onCompleted = (data) =>{
        this.setState(prevState => {
            return {
                data: [...prevState.data,data],
                shouldBlock:false
            }
        })
    }

    render() {
        const {trail} = this.state
        return (
            <div className="experiment-bg">
                <Prompt when={this.state.shouldBlock} message={location => `Are you sure you want to leave this page?`} />
                <div className="item-exp">
                    {this.state.ready ?
                        (<BubbleScreen trail={trail} onCompleted={this.onCompleted} />) :
                        (<Button variant="contained" size="large" className="mx-auto w-50 d-block button-wrapper" onClick={this.handleBegin}>
                            Begin
                        </Button>)
                    }
                </div>
                <div className="item-side">
                    <SideBar goBack={this.props.history.goBack} activeStep={this.props.location.state.activeStep} setShouldBlock={this.setShouldBlock} data={this.state.data} id={this.state.id} expIndex={this.state.expIndex} ready={this.state.ready} test={false} heading={trail.heading} instruction={trail.description} />
                </div>
            </div>
        )
    }
}

export default ExperimentPage;