import React from 'react'
import {Card,CardHeader,CardContent, Typography} from '@material-ui/core'

function ExperimentCard(props) {
    return (
        <div>
            <Card className="m-2">
                <CardHeader title={props.title} subheader={props.subheader} />
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