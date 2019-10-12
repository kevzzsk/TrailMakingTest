import React, { PureComponent, Component } from 'react';

import { Link, Prompt } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Skeleton from '@material-ui/lab/Skeleton';

import SideParameter from './SideParameter'
import BubbleScreen from '../BubbleScreen'

import axios from 'axios'

import templateA1 from '../../template/templateA1'
import templateB1 from '../../template/templateB1'

class CreateExperiment extends Component {

    constructor(props) {
        super(props)
        this.state = {
            metaData: null,
            trails: [],
            chosenTrail: null,
            payload:[],
            loading: false
        }
    }

    componentWillMount() {
        this.showLoader()
    }

    componentDidMount() {
        // get templates
        console.log(this.props)

        this.setState({
            trails: this.props.location.state.metaData.trails,
            chosenTrail:this.props.location.state.metaData.trails[0],
            metaData: this.props.location.state.metaData,
            payload: this.props.location.state.payload?this.props.location.state.payload: []
        })
        this.hideLoader()
    }

    componentDidUpdate(prevProps) {
        console.log("DidUpdate")
        if (prevProps.location.key !== this.props.location.key) {
            window.location.reload()
        }
    }

    onChangeTrail = (newTrailID) => {
        this.setState({
            chosenTrail: this.state.trails.find((item) => String(item.templateExperimentID) === newTrailID)
        })
    }

    hideLoader = () => {
        this.setState({ loading: false });
    }

    showLoader = () => {
        this.setState({ loading: true });
    }


    render() {
        return (
            <div className="create-experiment-bg">
                {this.state.loading ? <Skeleton width="100%" height={500} /> :
                    <>
                        <Prompt when={false} message={location => `Are you sure you want to leave this page?`} />
                        <div className="c-item-title p-2">
                            <Typography variant="h4" className="font-weight-bold">Create New Experiment</Typography>
                        </div>
                        <div className="item-exp">
                            <BubbleScreen trail={this.state.chosenTrail} />
                        </div>
                        <div className="item-side">
                            <SideParameter payload={this.state.payload} metaData={this.state.metaData} trail={this.state.chosenTrail} onChangeTrail={this.onChangeTrail} />
                        </div>
                    </>}
            </div>
        )
    }
}

export default CreateExperiment;