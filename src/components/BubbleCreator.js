import React, { Component } from 'react'

import Bubble from './Bubble';

class BubbleCreator extends Component {

    constructor(props) {
        super(props);

        this.state = {
            screenWidth: window.innerWidth,
            screenHeight: window.innerHeight,
            padding: 10,
            radius: 10,
            bubblePadding: 60, // padding of each bubble to prevent clustering
            bubbles: []
        }


    }

    componentDidMount() {
        this.update();
        this.divElement.addEventListener("resize", this.update); //event listener when window is resized
    }

    update = () => {
        this.setState({
            screenHeight: this.divElement.clientHeight,
            screenWidth: this.divElement.clientWidth
        }, () => this.genBubbles(25))
    }


    // generate random number
    getRandomInRange = (from, to, fixed) => {
        return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
        // .toFixed() returns string, so ' * 1' is a trick to convert to number
    }

    // calc distance between 2 points
    getDistBtw2Pts = (x1, y1, x2, y2) => {
        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
    }

    genBubbles = (number) => {
        // create bubbles
        const { padding, screenHeight, screenWidth, bubblePadding, radius } = this.state
        let index = 0
        let bubbles = []
        while (bubbles.length < 25) {

            const prop = {
                x: this.getRandomInRange(padding, screenWidth - 2 * padding - radius, 0),
                y: this.getRandomInRange(padding, screenHeight - 2 * padding - radius, 0),
                number: index + 1
            }

            let overlapping = false;
            for (let j = 0; j < bubbles.length; j++) {
                const circle = bubbles[j];
                const dist = this.getDistBtw2Pts(circle.x, circle.y, prop.x, prop.y);
                if (dist < bubblePadding) {
                    overlapping = true;
                }
            }
            if (!overlapping) {
                index++;
                bubbles.push(prop)
            }

        }
        this.setState({
            bubbles
        })
    }

    render() {
        return (
            <div className="bubble-bg" style={{ padding: this.state.padding }} ref={(divElement) => this.divElement = divElement}>
                <p>height: {this.state.screenHeight} </p>
                <p>width: {this.state.screenWidth} </p>
                {this.state.bubbles.map((props) => {
                    return <Bubble key={props.number} {...props} />
                })}
            </div>
        )
    }
}

export default BubbleCreator;