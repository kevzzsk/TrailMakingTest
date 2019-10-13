
import React,{Component} from 'react';
import { Paper, Button, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom'
import Steppers from './Steppers'
import axios from "axios"

class CompletionPage extends Component {


    // KEEP INFO IN DATABASE

    render(){
        const { experimentID, payload, activeStep,trail } = this.props.location.state
        return (
            <Paper className="m-5 text-center">
                <div className="card-header">
                    <Typography variant="h4">
                        You Have Completed The Experiment!
                    </Typography>
                    <Typography variant="subtitle1">
                        Thank You For Your Time!
                    </Typography>
                </div>
                <br />
                <Typography variant="h4" className="card-title ">Experiment {experimentID}</Typography>
                {payload.map((item,i) => {
                    return <Paper key={i} className="card-body text-justify w-25 mx-auto my-3">
                        <Typography variant="h6">{item.heading}</Typography>
                        <Typography display="inline">Total Time: </Typography> <Typography display="inline" className="float-right">{(item.stop - item.start) / 1000}s</Typography> <br />
                        <Typography display="inline">Success: </Typography><Typography display="inline" className="float-right">{item.events.filter((e) => e.type === "Success").length}</Typography> <br />
                        <Typography display="inline">Error: </Typography><Typography display="inline" className="float-right">{item.events.filter((e) => e.type === "Error").length}</Typography> <br />
                        <Typography display="inline">Missed: </Typography><Typography display="inline" className="float-right">{item.events.filter((e) => e.type === "Miss").length}</Typography> <br />
                    </Paper>
                })}
                <div className="w-50 m-auto">
                    <Steppers trails={trail} activeStep={activeStep} />
                </div>
                <Link to="/"><Button variant="contained" className="mb-3">Go Home</Button></Link>
                <Link to="/blog"><Button color="primary" variant="contained" className="mb-3 ml-2">Read More About Dementia</Button></Link>
            </Paper>
        )
    }
    
}

export default CompletionPage;