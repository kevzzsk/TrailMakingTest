import React, { Component } from 'react'
import Skeleton from "@material-ui/lab/Skeleton"
import { Redirect } from "react-router-dom"
import axios from "axios"
class SubmissionPage extends Component {

    state = {
        loading: true
    }

    componentDidMount() {
        let data = {}
        const { experimentID, payload, activeStep, trail, participantDetails, doctorID } = this.props.location.state
        if (doctorID === "") {
            const {name: otherProps, ...otherDetails} = participantDetails
            data = {
                experimentID: experimentID,
                completedTrails: payload.map(trail => {
                    return {
                        heading: trail.heading,
                        totalTime: (trail.stop - trail.start) / 1000,
                        success: trail.events.filter((e) => e.type === "Success").length,
                        error: trail.events.filter((e) => e.type === "Error").length,
                        miss: trail.events.filter((e) => e.type === "Miss").length,
                    }
                }),
                participantDetails: otherDetails
            }
        } else{
            data = {
                experimentID: experimentID,
                doctorID: doctorID,
                completedTrails: payload.map(trail => {
                    return {
                        heading: trail.heading,
                        totalTime: (trail.stop - trail.start) / 1000,
                        success: trail.events.filter((e) => e.type === "Success").length,
                        error: trail.events.filter((e) => e.type === "Error").length,
                        miss: trail.events.filter((e) => e.type === "Miss").length,
                    }
                }),
                participantDetails: participantDetails
            }
        }
        console.log(data)
        axios.post("https://cors-anywhere.herokuapp.com/https://easya.fyp2017.com/api/tmt/addExperimentResult", data)
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
                    pathname: "/completion",
                    state: this.props.location.state
                }} />}
            </div>
        )
    }
}

export default SubmissionPage