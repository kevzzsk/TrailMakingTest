import React from 'react';
import {Card,CardHeader,CardContent, Typography} from '@material-ui/core';

function UserPageCard(props) {
    return (
        <div>
            <Card className="m-2">
                <CardHeader title={props.title} subheader={props.subheader} />
                <CardContent>
                    <Typography variant="body2">
                        {props.status}
                        Days Online: {props.daysOnline}
                        Number of Respondents: {props.respondents}
                        Create Date: {props.createDate}
                        Start Date: {props.startDate}
                        End Date: {props.endDate}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}


export default UserPageCard;