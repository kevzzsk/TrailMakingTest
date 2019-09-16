import React, { Component } from 'react'

import template1 from "./template1"
import Bubble from "./Bubble"
import Theme from "./Theme"
import { minHeight } from '@material-ui/system';

class BubbleScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bubble_markers: [],
            height: 0,
            width: 0,
            progress:0
        }
        this.data = {
			start: undefined,
			stop: undefined,
			events: []
		};
    }

    componentDidMount() {
        const height = this.divElement.clientHeight;
        const width = this.divElement.clientWidth;
        this.setState({ height, width });
        this.data.start = new Date().getTime()
    }

    getScaleX = () => {
        let canvas_w = template1.width;
        let scale_x = this.state.width/canvas_w;
        return scale_x
    }

    getScaleY = () => {
        let canvas_h = template1.height;
        let scale_y = this.state.height/canvas_h;
        return scale_y
    }

    update = (type, date, correctToken, selectedToken) => {
		this.data.events.push({
			stamp: date.getTime,
			type: type,
			correctToken: correctToken,
			selectedToken: selectedToken
		});
		console.log(this.data.events[this.data.events.length-1]);
    }
    
    onCompleted = (date) => {
        this.data.stop = date.getTime();
        console.log((this.data.stop - this.data.start)/1000);
		console.log("Trails Data:");
		console.log(this.data);
    }

    handleSuccess = (e,i)=>{
        this.update("Success", new Date(), template1.tokens[i], template1.tokens[i]);
        this.setState(prev => ({ progress: ++prev.progress }));

        if (this.state.progress >= template1.tokens.length-1) {
			this.onCompleted(new Date());
		}

        console.log("SUCCESS")
    }

    handleError = (e,i)=>{

        this.update("Error", new Date(), template1.tokens[this.state.progress], template1.tokens[i]);
        console.log("ERROR")
    }

    renderBubbles = () => {
        let tokens = template1.tokens;
        let diameter = template1.diameter;
        let scale_x = this.getScaleX();
        let scale_y = this.getScaleY();
        let bubbles = []

        for (let i = 0; i < tokens.length; i++) {
            // if correctly selected show as completed
            let theme = this.state.progress > i ?
                Theme.success :
                Theme.error;

            // if next in line to be selected handle with success
            // else handle with error
            let handler = this.state.progress === i ?
                (e) => this.handleSuccess(e, i) :
                (e) => this.handleError(e, i);

            // if finished, don't listen anymore
            if (this.state.progress >= tokens.length) {
                handler = undefined;
            }

            // add the marker keyed to the token
            bubbles.push(
                <Bubble
                    cx={Math.floor(tokens[i].x * scale_x)}
                    cy={Math.floor(tokens[i].y * scale_y)}
                    fontSize={Math.floor(diameter / 2 * Math.min(scale_x,scale_y))}
                    key={"trails-marker-" + tokens[i].text}
                    onClick={handler}
                    r={Math.floor(diameter / 2 * Math.min(scale_x,scale_y))}
                    text={tokens[i].text}
                    theme={theme}
                />);
        }
        return bubbles;
    }

    render() {
        return (
            <div ref={(divElement) => this.divElement = divElement} className="h-100">
                <svg height={this.state.height}
                    onClick={this.handleMiss}
                    width={this.state.width}
                    xmlns="http://www.w3.org/2000/svg">
                    {this.renderBubbles()}
                </svg>
            </div>
        )
    }
}


export default BubbleScreen;