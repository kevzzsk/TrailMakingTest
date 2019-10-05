import React, { PureComponent,Component } from 'react';

import {Link, Prompt} from 'react-router-dom';
import {Typography,Button} from '@material-ui/core'

import SideParameter from './SideParameter'
import BubbleScreen from '../BubbleScreen'

import templateA1 from '../../template/templateA1'
import templateB1 from '../../template/templateB1'

class CreateExperiment extends PureComponent{

    constructor(props){
        super(props)
        this.state={
            metaData: null,
            trails:[],
            chosenTrail: null,
        }
    }

    componentWillMount(){
        // get templates
        this.setState({
            trails:[templateA1,templateB1],
            chosenTrail:templateA1,
            metaData: this.props.location.state.metaData,
            payload: this.props.location.state.payload?  this.props.location.state.payload: []
        })
    }

    componentDidUpdate(prevProps) {
        console.log("DidUpdate")
        if (prevProps.location.key !== this.props.location.key) {
            window.location.reload()
        }
    }

    onChangeTrail = (newTrailID) =>{
        this.setState({
            chosenTrail:this.state.trails.find((item)=> String(item.id)=== newTrailID)
        })
    }


    render(){
        return(
            <div className="create-experiment-bg">
                <Prompt when={false} message={location => `Are you sure you want to leave this page?`} />
                <div className="c-item-title p-2">
                    <Typography variant="h4" className="font-weight-bold">Create New Experiment</Typography>
                </div>
                <div className="item-exp">
                    <BubbleScreen trail={this.state.chosenTrail.trail}/>
                </div>
                <div className="item-side">
                   <SideParameter payload={this.state.payload} metaData={this.state.metaData} trails={this.state.trails} trail={this.state.chosenTrail} onChangeTrail={this.onChangeTrail}/>
                </div>
            </div>
        )
    }
}

export default CreateExperiment;