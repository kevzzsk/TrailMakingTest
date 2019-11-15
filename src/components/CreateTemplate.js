import React, { Component } from 'react'


import {
    Switch,
    FormControl,
    TextField,
    Typography,
    Slider,
    Button,
    Paper,
    ButtonGroup,
    CircularProgress
} from '@material-ui/core'

import axios from 'axios'


/** Create new Template page for Researcher */
class CreateTemplate extends Component {
    /** @constructor */
    constructor(props) {
        super(props);
        this.state = {
            isB: false,
            heading: "",
            name: "",
            instruction: "",
            diameter: 30,
            json: [],
            alphabet: "A",
            number: 1,
            width: 0,
            height: 0,
            loading: false,
            desPartA: "When you are ready, click BEGIN.\nThere are numbers in circles on this page.\nPlease click on the circles from one number to the next, in order. Start at 1 , then go to 2 , then go to 3 , and so on.\nWork as quickly and accurately as you can.\n\nAt the end of the test please click on CONTINUE button",
            desPartB: "When you are ready, click BEGIN.\nThere are numbers and letters in circles on this page.\nPlease click on the circles from one number to the next, in order. Start at number 1 , then go to the first letter A , then go to number 2 , and then the next letter B and so on.\nWork as quickly and accurately as you can.\n\nAt the end of the test please click on CONTINUE button",
        }
    }

    /** Initialize data  */
    componentDidMount() {
        this.setState({
            width: this.canvasDiv.clientWidth,
            height: this.canvasDiv.clientHeight
        })
        this.canvas.addEventListener("mousedown", this.getCursorPosition)
    }

    /**
     * @method
     * @param {Object} event Event DOM
     * @description Update X and Y coordinate of every user click on canvas
     */
    getCursorPosition = (event) => {
        const rect = this.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        var temp;
        if (this.state.isB) {
            if (this.state.json.length % 2 === 1) {
                temp = this.state.alphabet;
                this.setState({
                    alphabet: this.nextChar(temp)
                })
            } else {
                temp = this.state.number;
                this.setState({
                    number: temp + 1
                })
            }
        }
        else {
            temp = this.state.number;
            this.setState({
                number: temp + 1
            })
        }
        console.log("x: " + x + " y: " + y);
        console.log(temp);
        this.drawCoordinates(x, y, temp);
        this.setState(prevState => {
            return {
                json: [...prevState.json, {
                    "x": x,
                    "y": y,
                    "text": temp.toString()
                }]
            }
        })
    }

    /**
     * @method
     * @param {int} x X-coordinate
     * @param {int} y Y-coordinate
     * @param {int} z Text to display on bubble
     * @description Draw bubble centered on user click X and Y
     */
    drawCoordinates = (x, y, z) => {
        const { diameter, json } = this.state
        var pointSize = diameter; // Change according to the size of the point.
        var ctx = this.canvas.getContext("2d");
        ctx.font = "30px Arial"
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.strokeStyle = "#ff2626"; // Red color
        ctx.beginPath(); //Start path
        ctx.arc(x, y, pointSize/2, 0, Math.PI * 2, true); // Draw a point using the arc function of the canvas with a point structure.
        ctx.stroke(); // Close the path and stroke.
        ctx.fillText(z, x, y);
        if (Number.isInteger(z) && z <= 1) {
        }
        else {
            ctx.moveTo(json[json.length - 1]["x"], json[json.length - 1]["y"]);
            ctx.lineTo(x, y);
            ctx.stroke();
        }
    }

    /**
     * @method
     * @param {int} c ASCII Character
     * @description Get next ASCII Character
     */
    nextChar = (c) => {
        return String.fromCharCode(c.charCodeAt(0) + 1);
    }
    /**
     * @method
     * @param {int} c ASCII Character
     * @description Get prev ASCII Character
     */
    prevChar = (c) => {
        return String.fromCharCode(c.charCodeAt(0) - 1);
    }

    /**
     * @method
     * @description Redraw the whole canvas in the case of UNDO or CLEAR
     */
    redraw = () => {
        this.state.json.forEach((bubble, i) => {
            const { x, y, text } = bubble
            const { diameter, json } = this.state
            var pointSize = diameter; // Change according to the size of the point.
            var ctx = this.canvas.getContext("2d");
            ctx.font = "30px Arial"
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.strokeStyle = "#ff2626"; // Red color
            ctx.beginPath(); //Start path
            ctx.arc(x, y, pointSize/2, 0, Math.PI * 2, true); // Draw a point using the arc function of the canvas with a point structure.
            ctx.stroke(); // Close the path and stroke.
            ctx.fillText(text, x, y);
            if (i >= json.length - 1) {
            }
            else {
                ctx.moveTo(json[i + 1]["x"], json[i + 1]["y"]);
                ctx.lineTo(x, y);
                ctx.stroke();
            }
        })
    }

    /**
     * @method
     * @description Undo previous click. Remove last bubble
     */
    undoCanvas = () => {
        this.setState(prevState => {
            return {
                json: prevState.json.filter((_, i) => i < prevState.json.length - 1), // remove last item on array
                number: prevState.isB ? (prevState.json.length % 2 === 0 ? prevState.number : prevState.number - 1) : prevState.number - 1,
                alphabet: prevState.isB ? (prevState.json.length % 2 === 0 ? this.prevChar(prevState.alphabet) : prevState.alphabet) : prevState.alphabet
            }
        }, () => {
            var ctx = this.canvas.getContext("2d");
            ctx.clearRect(0, 0, this.state.width, this.state.height);
            this.redraw()
        })
    }

    /**
     * @method
     * @description Clear Canvas. Remove all bubbles in the canvas
     */
    clearCanvas = () => {
        var ctx = this.canvas.getContext("2d");
        ctx.clearRect(0, 0, this.state.width, this.state.height);
        this.setState({
            number: 1,
            alphabet: "A",
            json: []
        })
    }

    /**
     * @method
     * @description Handle generic event
     * @param {Object} event Event DOM
     */
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.name === "isB" ? e.target.checked : e.target.value
        })
    }

    /**
     * @method
     * @param {Object} e Event DOM
     * @param {int} val new diameter
     * @description Handle Slider value(diameter) change
     */
    handleSliderChange = (e, val) => {
        this.setState({
            diameter: val
        })
    }
    /**
     * @method 
     * @description SetState to hide loader */
    hideLoader = () => {
        this.setState({ loading: false });
    }
    /**
     * @method 
     * @description SetState to show loader */
    showLoader = () => {
        this.setState({ loading: true });
    }

    /**
     * @method
     * @param {Object} event Event DOM
     * @description Handle Form submission to POST to backend
     */
    handleSubmit = (event) => {
        event.preventDefault()
        this.showLoader()

        let body = {
            templateName: this.state.name,
            trail: {
                width: this.state.width,
                height: this.state.height,
                diameter: this.state.diameter,
                heading: this.state.heading,
                instruction: this.state.isB ? this.state.desPartB : this.state.desPartA,
                tokens: this.state.json
            }
        }

        if (this.state.json.length <= 0) {
            this.hideLoader()
            return false
        }

        axios.post("https://cors-anywhere.herokuapp.com/https://easya.fyp2017.com/api/tmt/createTemplate", body)
            .then(res => {
                console.log(res)
                alert("Template Created!")
                this.props.history.push({
                    pathname: '/user-page'
                })
            })
            .catch(err => {
                console.log(err)
                alert("Error! Template Not Created!")
                return false;
            })

    }

    render() {
        return (
            <div className="ctemp-bg" >
                <div ref={elem => this.canvasDiv = elem} className="m-3 p-3 ">
                    <canvas ref={elem => this.canvas = elem} className="converingCanvas" width={this.state.width} height={this.state.height} style={{ border: "1px solid #000000" }}></canvas>
                </div>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <Paper className="m-3 ml-n2 p-3 align-items-center ctemp-side">
                                <h2>Create Template</h2>
                            <FormControl variant="outlined" className="w-100">
                                <TextField
                                    required
                                    id="outlined-name"
                                    label="Template Name"
                                    placeholder="SG001-EX"
                                    name="name"
                                    onChange={this.handleChange}
                                    value={this.state.name}
                                    margin="normal"
                                    variant="outlined"
                                    type="text"
                                    rowsMax={1}
                                />
                            </FormControl>

                            <FormControl variant="outlined" className="w-100">
                                <TextField
                                    required
                                    id="outlined-heading"
                                    label="Template Heading"
                                    placeholder="Part X"
                                    name="heading"
                                    onChange={this.handleChange}
                                    value={this.state.heading}
                                    margin="normal"
                                    variant="outlined"
                                    type="text"
                                    rowsMax={1}
                                />
                            </FormControl>
                            <FormControl variant="outlined" className="w-100">
                                <TextField
                                    id="outlined-instruction"
                                    label="Template Instruction"
                                    placeholder="Click BEGIN to start"
                                    name="instruction"
                                    onChange={this.handleChange}
                                    value={this.state.isB ? this.state.desPartB : this.state.desPartA}
                                    margin="normal"
                                    variant="outlined"
                                    type="text"
                                    multiline
                                    inputProps={{
                                        readOnly: true
                                    }}
                                />
                            </FormControl>

                            <p>
                                <span>{this.state.isB ? "Part B" : "Part A"}</span> <Switch value={this.isB} name="isB" onClick={this.handleChange} color="primary" />
                            </p>
                            <Typography id="discrete-slider-custom" gutterBottom>
                                Bubble Diameter
                                        </Typography>
                            <Slider
                                aria-labelledby="diameter"
                                step={1}
                                name="diameter"
                                value={this.state.diameter}
                                valueLabelDisplay="on"
                                onChange={this.handleSliderChange}
                                min={10}
                                max={80}
                            />
                            <ButtonGroup variant="outlined" fullWidth className="mt-3">
                                <Button color="primary" onClick={this.clearCanvas}>
                                    Clear
                            </Button>
                                <Button color="primary" onClick={this.undoCanvas}>
                                    Undo
                            </Button>
                            </ButtonGroup>
                            <div className="position-relative mt-3">
                                <Button disabled={this.state.loading} variant="contained" color="primary" className="w-100" type="submit">
                                    Create Template
                            </Button>
                                {this.state.loading && <CircularProgress size={40} className="button-loading" />}
                            </div>

                            <Button className="mt-3" variant="outlined" onClick={() => this.props.history.goBack()}>back</Button>
                        </Paper>
                    </form>
                </div>
            </div>
        )
    }
}


export default CreateTemplate