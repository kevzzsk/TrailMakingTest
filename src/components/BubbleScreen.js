import React, { Component } from 'react'

import Bubble from "./Bubble"
import Theme from "./Theme"
import { minHeight } from '@material-ui/system';
import PopUp from './Popup'

class BubbleScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bubble_markers: [],
            height: 500,
            width: 500,
            progress: 0,
            error: "",
            trail: null
        }
        this.data = {
            heading : "",
            start: undefined,
            stop: undefined,
            events: []
        };
    }

    static defaultProps = {
        //beginEndLabels: false,
        //part: "A",
        trail: null,
        feedback: true,
        errorText: "X",
        errorDuration: 500,
        completedText: "Completed!",
        progress: 0,
        retry: false,
        test:false,
        retryText: "Would you like to retry?",
        onRetry: () => { },
        onSuccess: (date, token) => { },
        onError: (date, correctToken, selectedToken) => { },
        onCompleted: (date) => { },
        onMiss: (date, correctToken, x, y) => { }
    }


    componentDidMount() {
        const height = this.divElement.clientHeight;
        const width = this.divElement.clientWidth;
        this.setState({ height, width ,trail:this.props.trail });
        this.data.start = new Date().getTime();
        this.data.heading =this.props.trail.heading
        //console.time("START")
    }

    componentDidUpdate(){
        if(this.state.trail !== this.props.trail){
            this.setState({
                trail: this.props.trail,
                progress: 0
            })
        }
    }

    getScaleX = () => {
        let canvas_w = this.props.trail.width;
        let radius = this.props.trail.diameter/2
        let scale_x = (this.state.width-radius-5) / canvas_w;
        return scale_x
    }

    getScaleY = () => {
        let canvas_h = this.props.trail.height;
        let radius = this.props.trail.diameter/2
        let scale_y = (this.state.height-radius-5) / canvas_h;
        return scale_y
    }

    update = (type, date, correctToken, selectedToken) => {
        this.data.events.push({
            stamp: date.getTime(),
            type: type,
            correctToken: correctToken,
            selectedToken: selectedToken
        });
        console.log(this.data.events[this.data.events.length - 1]);
    }

    onCompleted = (date) => {
        this.data.stop = date.getTime();
        //console.log((this.data.stop - this.data.start) / 1000);
        //console.log("Trails Data:");
        //console.log(this.data);
        //console.timeEnd("START");
        this.props.onCompleted(this.data)
    }

    handleSuccess = (e, i) => {

        this.handled = true; // to prevent handleMiss from firing

        this.update("Success", new Date(), this.props.trail.tokens[i], this.props.trail.tokens[i]);
        this.setState(prev => ({ progress: ++prev.progress }));

        if (this.state.progress >= this.props.trail.tokens.length - 1) {
            this.onCompleted(new Date());
        }
    }

    handleError = (e, i) => {

        this.handled = true; // to prevent handleMiss from firing

        this.update("Error", new Date(), this.props.trail.tokens[this.state.progress], this.props.trail.tokens[i]);
        if (this.props.feedback) {
            this.setState({ error: this.props.errorText });

            // remove the error after a predetermined duration
            clearTimeout(this.timeout);
            this.timeout = setTimeout(
                () => {
                    this.setState({ error: "" });
                },
                this.props.errorDuration
            );
        }
    }

    handleMiss = (e) => {
        if (this.state.progress < this.props.trail.tokens.length - 1) { // stop handler when test is completed
            if (!this.handled) {
                this.update("Miss", new Date(), this.props.trail.tokens[this.state.progress], { text: "", x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
            }
            this.handled = false;
        }
    }

    renderBubbles = () => {
        let tokens = this.props.trail.tokens;
        let diameter = this.props.trail.diameter;
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
            let handler = this.props.test? ()=>{} :(this.state.progress === i ?
                (e) => this.handleSuccess(e, i) :
                (e) => this.handleError(e, i))

            // if finished, don't listen anymore
            if (this.state.progress >= tokens.length) {
                handler = undefined;
            }

            // add the marker keyed to the token
            bubbles.push(
                <Bubble
                    cx={Math.floor(tokens[i].x * scale_x)}
                    cy={Math.floor(tokens[i].y * scale_y)}
                    fontSize={Math.floor(diameter / 2 * Math.min(scale_x, scale_y))}
                    key={"trails-marker-" + tokens[i].text}
                    onClick={handler}
                    r={Math.floor(diameter / 2 * Math.min(scale_x, scale_y))}
                    text={tokens[i].text}
                    theme={theme}
                />);
        }
        return bubbles;
    }

    renderCompletionContent = () => {
        if (this.props.retry === false) {
            return this.props.completedText;
        }
        return (
            <div style={{ marginTop: '10px' }}>
                <p>{this.props.retryText}</p>
                <button
                    onClick={this.props.onRetry} // TODO: remove retry
                    style={{ color: 'white', background: '#333', border: 'none', fontSize: '2rem', marginTop: '10px' }}
                >
                    Retry
				</button>
            </div>
        );
    }

    render() {
        return (
            <div ref={(divElement) => this.divElement = divElement} className="h-100">
                <svg height={this.state.height}
                    onClick={ this.props.test?()=>{} :this.handleMiss}
                    width={this.state.width}
                    xmlns="http://www.w3.org/2000/svg">
                    {this.renderBubbles()}
                </svg>
                <PopUp
                    fontSize="3em"
                    onlyIf={this.state.error !== ""}
                    theme={Theme.error}
                    width={this.state.width}
                >
                    {this.props.errorText}
                </PopUp>
                <PopUp
                    onlyIf={this.state.progress >= this.props.trail.tokens.length}
                    theme={Theme.success}
                    retry={this.props.retry}
                    width={this.state.width}
                >
                    {this.renderCompletionContent()}
                </PopUp>
            </div>
        )
    }
}


export default BubbleScreen;