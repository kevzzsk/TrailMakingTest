import React, { Component } from 'react'
import Skeleton from "@material-ui/lab/Skeleton"
import { Redirect } from "react-router-dom"
import axios from "axios"


class CreateSubmission extends Component {

    state = {
        loading: true
    }

    componentDidMount() {
        let data = {}
        const { accountID, metaData, payload } = this.props.location.state
        data = {
            userID: accountID,
            experimentID: metaData.ExperimentID,
            experimentName: metaData.ExperimentName,
            startDate: metaData.startDate,
            endDate: metaData.endDate,
            description:metaData.description,
            experimentList: payload.map(trail=> {return{templateID:trail.trailID}})
        }

        console.log(data)
        axios.post("https://cors-anywhere.herokuapp.com/https://easya.fyp2017.com/api/tmt/createExperiment", data)
            .then(res => {
                console.log(res)
                this.setState({
                    loading: false
                })
            })
            .catch(err => {
                console.log(err)
                this.setState({
                    loading: false
                })
            })
    }
    render() {
        return (
            <div>
                {this.state.loading ? <Skeleton width="100%" height={800} /> : <Redirect to={{
                    pathname: "/user-page"
                }} />}
            </div>
        )
    }
}

export default CreateSubmission