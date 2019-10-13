import React from 'react'
import {Paper,Button, Typography} from '@material-ui/core';
import {Link} from 'react-router-dom'
import {toDate,format} from 'date-fns'

function CreateCompleted(props) {
    const {ExperimentID,ExperimentName,description,endDate,startDate} = props.location.state.metaData
    const {payload} = props.location.state

    
    return (
        <div>
            <Paper className="m-5 text-center">
                <div className="card-header">
                <Typography variant="h4" display="inline">
                Experiment 
                </Typography>
                <span> </span>
                <Typography variant="h4" display="inline" className="font-weight-bold">
                {ExperimentName}({ExperimentID})
                </Typography>
                </div>
                <Typography variant="h5">Start Date: {format(startDate,'do MMM yyyy')}</Typography>
                <Typography variant="h5">End Date: {format(toDate(endDate),'do MMM yyyy')}</Typography>
                <Typography variant="h5">Description: {description}</Typography>
                
                {payload.map((item,i) => {
                    return <Paper key={i} className="card-body text-justify mx-auto my-3 w-25">
                        <Typography variant="h6">{item.heading}</Typography>
                        <Typography display="inline">Trail Name: </Typography> <Typography display="inline" className="float-right">{item.trailName}</Typography> <br />
                        <Typography display="inline">Trail ID: </Typography><Typography display="inline" className="float-right">{item.trailID}</Typography> <br />
                    </Paper>
                })}
                <Button variant="text" className="mb-3" onClick={()=>props.history.goBack()}>Back</Button>
                <Link to={{
                    pathname:"/user-page/create-experiment/submit",
                    state: props.location.state
                }}><Button variant="contained" className="mb-3">Create</Button></Link>
            </Paper>
        </div>
    )
}



export default CreateCompleted;