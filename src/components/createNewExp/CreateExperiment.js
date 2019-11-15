import React, { Component } from 'react';

import {Prompt } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';

import SideParameter from './SideParameter'
import BubbleScreen from '../BubbleScreen'


/**
 * Create New Experiment page where researcher can set choose the template
 */
class CreateExperiment extends Component {
    /** @constructor */
    constructor(props) {
        super(props)
        this.state = {
            metaData: null,
            trails: [],
            chosenTrail: null,
            payload: [],
            loading: false
        }
    }

    /** Show loader to wait for mounting */
    componentWillMount() {
        this.showLoader()
    }
    /** get templates when mounted */
    componentDidMount() {
        // get templates
        console.log(this.props)
        this.setState({
            trails: this.props.location.state.metaData.trails,
            chosenTrail: this.props.location.state.metaData.trails[0],
            metaData: this.props.location.state.metaData,
            payload: this.props.location.state.payload ? this.props.location.state.payload : []
        })

        this.hideLoader()
    }

    /** Handle next page when key changes since page is reused */
    componentDidUpdate(prevProps) {
        if (prevProps.location.key !== this.props.location.key) {
            this.setState({
                trails: this.props.location.state.metaData.trails,
                chosenTrail: this.props.location.state.metaData.trails[0],
                metaData: this.props.location.state.metaData,
                payload: this.props.location.state.payload ? this.props.location.state.payload : []
            })
        }
    }

    /**
     * @method
     * @param {int} newTrailID new Trail ID
     * @description Update trail Id when user select a new trail
     */
    onChangeTrail = (newTrailID) => {
        this.setState({
            chosenTrail: this.state.trails.find((item) => String(item.templateExperimentID) === newTrailID)
        })
    }

    /**
     * @method 
     * @description SetState to hide loader */
    hideLoader = () => {
        this.setState({ loading: false });
    }
    /**
     * @method 
     * @description SetState to show loader */
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
                            <BubbleScreen key={this.props.location.key} trail={this.state.chosenTrail} />
                        </div>
                        <div className="item-side">
                            <SideParameter key={this.props.location.key} accountID={this.props.location.state.accountID} payload={this.state.payload} metaData={this.state.metaData} trail={this.state.chosenTrail} onChangeTrail={this.onChangeTrail} />
                        </div>
                    </>}
            </div>
        )
    }
}

export default CreateExperiment;