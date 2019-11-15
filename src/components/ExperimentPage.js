
import React, { PureComponent } from 'react';
import {  Button } from '@material-ui/core';
import BubbleScreen from './BubbleScreen';
import SideBar from './SideBar';
import {Prompt } from 'react-router-dom'

/**
 * ExperimentPage handles the interactive part of the experiment
 * It renders the actual experiment page
 * @param {*} props
 * 
 */
class ExperimentPage extends PureComponent {

    static defaultProps ={
        activeStep:0
    }

    /** @constructor */
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            ready: false,
            expIndex: 0,
            shouldBlock: true
        };
    }

    /** @method */
    componentWillMount() {
        console.log("WillMount")
        this.init()
    }

    /** 
     * @method
     * @description make sure page is updated when continue or refresh is clicked 
     * @param {Object} prevProps prevPros state*/
    componentDidUpdate(prevProps) {
        console.log("DidUpdate")
        if (prevProps.location.key !== this.props.location.key) {
            console.log("newKey")
            this.init()
        }
    }

    /**
     * @method
     * @description  Initialize data when change occurs. It is called in componentWillMount and componentDidUpdate
     */
    init = () => {
        const { experimentID, expIndex } = this.props.location.state
        this.setState({
            id: experimentID,
            expIndex,
            ready: false
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

    /** 
     * @method
     * @description Start the timer and render the experiment bubbles */
    handleBegin = () => {
        this.setState(prevState => {
            return {
                ready: !prevState.ready
            }
        })
    }

    /** 
     * @method
     * @description when trail is completed, append participant results and pass to next page
     * @param {Object} data Participant results on a trail 
    */
    onCompleted = (data) =>{
        this.setState(prevState => {
            return {
                data: [...prevState.data,data],
                shouldBlock:false
            }
        })
    }

    render() {
        const {participantDetails,activeStep,trail,doctorID} = this.props.location.state
        return (
            <div className="experiment-bg">
                <Prompt when={this.state.shouldBlock} message={location => `Are you sure you want to leave this page?`} />
                <div className="item-exp">
                    {this.state.ready ?
                        (<BubbleScreen trail={trail[this.state.expIndex]} onCompleted={this.onCompleted} />) :
                        (<Button variant="contained" size="large" className="mx-auto w-50 d-block button-wrapper" onClick={this.handleBegin}>
                            Begin
                        </Button>)
                    }
                </div>
                <div className="item-side">
                    <SideBar goBack={this.props.history.goBack} doctorID={doctorID} trail={trail} participantDetails={participantDetails} activeStep={activeStep} setShouldBlock={this.setShouldBlock} data={this.state.data} id={this.state.id} expIndex={this.state.expIndex} ready={this.state.ready} test={false} />
                </div>
            </div>
        )
    }
}

export default ExperimentPage;