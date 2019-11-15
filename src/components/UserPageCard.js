import React, { Component } from 'react';
import { Card, CardHeader, CardContent, Typography } from '@material-ui/core';

/** Reuseable component to display user information as a card*/
class UserPageCard extends Component {

    render() {
        return (
            <div>
                <Card className="m-2">
                    <CardHeader title={this.props.title} />
                    <CardContent>
                        <Typography variant="body2">
                            {this.props.status}<br/>
                            Days Online: {this.props.daysOnline}<br/>
                            Number of Respondents: {this.props.respondents}<br/>
                            Create Date: {this.props.createDate}<br/>
                            Start Date: {this.props.startDate}<br/>
                            End Date: {this.props.endDate}
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

export default UserPageCard;