import React from 'react'
import { Card, CardHeader, CardContent, Typography } from '@material-ui/core'

import { toDate, isBefore, format } from "date-fns"

function ExperimentCard(props) {

    let status_color = "radial-gradient(circle at 4px 4px, grey,grey)"

    const getStatus = (startDate, endDate) => {
        let start = new Date(startDate);
        let end = new Date(endDate);
        if (isBefore(new Date(), start)) {
            status_color="radial-gradient(circle at 4px 4px, grey,grey)"
            return "Draft"
        }
        else if (isBefore(new Date(), end)) {
            status_color="radial-gradient(circle at 4px 4px, rgba(16,168,25,1),rgba(8,158,11,1) 80%)"
            return "Active"
        }
        else {
            status_color="radial-gradient(circle at 4px 4px,rgba(237,26,26,1) 22%, rgba(161,7,7,1) 84%)"
            return "Completed"
        }
    }

    let status = getStatus(props.startDate, props.endDate)

    return (
        <div>
            <Card className="m-2">
                <div className="ml-2 p-2">
                    <Typography variant="h4" display="inline">{props.experimentName}</Typography>
                    <div className="d-inline-flex align-items-center">
                        <div className="circle d-inline mx-1" style={{background:status_color}}></div>
                        <Typography display="inline">{status}</Typography>
                    </div>
                    <br />
                    <Typography variant="subtitle1">{props.experimentID}</Typography>
                </div>
                <div className="ml-2 px-2">
                    <Typography>StartDate: {format(new Date(props.startDate), "dd/MM/yyyy")}</Typography>
                    <Typography>EndDate: {format(new Date(props.endDate), "dd/MM/yyyy")}</Typography>
                </div>
                <CardContent>
                    <Typography variant="body2">
                        {props.description}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}


export default ExperimentCard;