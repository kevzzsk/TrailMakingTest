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
            templates:[],
            chosenTemp: null
        }
    }

    componentWillMount(){
        // get templates
        this.setState({
            templates:[templateA1,templateB1],
            chosenTemp:templateA1
        })
    }

    onChangeTemplate = (newTempID) =>{
        this.setState({
            chosenTemp:this.state.templates.find((item)=> String(item.id )=== newTempID)
        })
    }


    render(){
        return(
            <div className="create-experiment-bg">
                <Prompt when={false} message={location => `Are you sure you want to leave this page?`} />
                <div className="c-item-title p-2">
                    <Link to="/" className="m-auto"><Button variant="contained">Back</Button></Link>
                    <Typography variant="h4" className="d-inline">Create New Experiment</Typography>
                </div>
                <div className="item-exp">
                    <BubbleScreen trail={this.state.chosenTemp.trail}/>
                </div>
                <div className="item-side">
                   <SideParameter templates={this.state.templates} onChangeTemplate={this.onChangeTemplate}/>
                </div>
            </div>
        )
    }
}

export default CreateExperiment;