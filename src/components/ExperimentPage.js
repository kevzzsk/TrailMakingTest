
import React, { Component } from 'react'
import {Grid} from '@material-ui/core'

import BubbleScreen from './BubbleScreen'
import SideBar from './SideBar'

class ExperimentPage extends Component {
    render() {
        return (
            <div className="experiment-bg">
                <div className="item-exp">
                    <BubbleScreen />
                </div>
                <div className="item-side">
                    <SideBar />
                </div>
            </div>
        )
    }
}

export default ExperimentPage;