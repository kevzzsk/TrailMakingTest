import React, { Component } from 'react'

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Slider from '@material-ui/core/Slider';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Tooltip from '@material-ui/core/Tooltip';


import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import 'date-fns';
import { differenceInCalendarDays, toDate } from 'date-fns'
import axios from "axios"
import { Link } from 'react-router-dom'

class CreateExperimentForm extends Component {
    static defaultProps = {
        onChangeTemplate: () => { },
        templates: []
    }

    constructor(props) {
        super(props);
        this.state = {
            startDate: toDate(new Date()),
            endDate: toDate(new Date()),
            duration: 0,
            description: "",
            ExperimentName: "",
            ExperimentID: 0,
            numTemplates: 2,
            trails: [],
            dataLoaded: false
        }
    }
    marks = [
        {
            value: 1,
            label: '1',
        },
        {
            value: 2,
            label: '2',
        },
        {
            value: 3,
            label: '3',
        },
        {
            value: 4,
            label: '4',
        },
    ]

    componentDidMount() {
        this.reGenerateID();
        axios.get("https://cors-anywhere.herokuapp.com/https://easya.fyp2017.com/api/tmt/getAllTemplate")
            .then(res => {
                this.setState({
                    trails: res.data.templateExperiments,
                    dataLoaded: true
                })

            })
            .catch(err => {
                console.log(err)
            })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSliderChange = (e, val) => {
        this.setState({
            numTemplates: val
        })
    }
    handleStartDateChange = (date) => {
        this.setState({
            startDate: date
        }, () => this.calcDuration())
    }

    handleEndDateChange = (date) => {
        this.setState({
            endDate: date
        }, () => this.calcDuration())
    }

    calcDuration = () => {
        if (this.state.startDate !== null && this.state.endDate !== null) {
            this.setState({
                duration: differenceInCalendarDays(this.state.endDate, this.state.startDate)
            })
        }
    }

    reGenerateID = () => {
        let first = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 1).toUpperCase();
        let ranID = String((Math.random() * 10000).toFixed(0)).padStart(4, "0");
        this.setState({
            ExperimentID: first + ranID
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.history.push({
            pathname: "/user-page/create-experiment/1",
            state: {
                metaData: this.state
            },
        });

    }

    render() {
        return (
            <div className="cexp-bg">
                <Grid container spacing={0} direction="column" justify="flex-start" alignItems="stretch" className="h-100 w-100">
                    <form onSubmit={this.handleSubmit}>
                        <Grid item className="text-center mt-3">
                            <Typography variant="h3">Create New Experiment</Typography>
                        </Grid>
                        <Grid item>
                            <Grid container spacing={2} direction="column" justify="center" alignItems="center" className="nested-grid-top">
                                <Grid item className="cexp-form-item" >
                                    <Paper className="p-4 mt-3 d-flex align-items-baseline justify-content-between">
                                        <Typography variant="h5" display="inline" >Experiment ID:</Typography><Typography display="inline" variant="h5" className="float-right">{this.state.ExperimentID}<Tooltip title="re-generate"><IconButton onClick={this.reGenerateID} className="px-2 py-auto"><i className="fas fa-redo fa-lg"></i></IconButton></Tooltip></Typography>
                                    </Paper>
                                </Grid>
                                <Grid item className="cexp-form-item" >
                                    <Paper className="p-4">
                                        <Grid container spacing={2} direction="column" justify="flex-start" alignItems="flex-start">
                                            <FormControl variant="outlined" className="w-100">
                                                <TextField
                                                    required
                                                    label="ExperimentName"
                                                    name="ExperimentName"
                                                    value={this.state.ExperimentName}
                                                    onChange={this.handleChange}
                                                    margin="normal"
                                                    variant="outlined"
                                                />
                                            </FormControl>
                                            <Typography id="discrete-slider-custom" gutterBottom>
                                                Number of Trails
                                        </Typography>
                                            <Slider
                                                aria-labelledby="number-of-templates"
                                                step={1}
                                                name="numTemplates"
                                                value={this.state.numTemplates}
                                                valueLabelDisplay="auto"
                                                marks={this.marks}
                                                onChange={this.handleSliderChange}
                                                min={1}
                                                max={4}
                                            />
                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <KeyboardDatePicker
                                                    disableToolbar
                                                    variant="inline"
                                                    inputVariant="outlined"
                                                    format="dd/MM/yyyy"
                                                    margin="normal"
                                                    disablePast
                                                    id="startDate"
                                                    label="Start Date"
                                                    value={this.state.startDate}
                                                    onChange={this.handleStartDateChange}
                                                    KeyboardButtonProps={{
                                                        'aria-label': 'change start date',
                                                    }}
                                                    className="w-100"
                                                />
                                            </MuiPickersUtilsProvider>
                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <KeyboardDatePicker
                                                    disableToolbar
                                                    variant="inline"
                                                    inputVariant="outlined"
                                                    format="dd/MM/yyyy"
                                                    margin="normal"
                                                    id="endDate"
                                                    label="End Date"
                                                    minDate={this.state.startDate}
                                                    minDateMessage="End Date should not be before Start Date"
                                                    value={this.state.endDate}
                                                    onChange={this.handleEndDateChange}
                                                    KeyboardButtonProps={{
                                                        'aria-label': 'change start date',
                                                    }}
                                                    className="w-100"
                                                />
                                            </MuiPickersUtilsProvider>
                                            <FormControl variant="outlined" className="w-100">
                                                <TextField
                                                    id="outlined-duration"
                                                    label="Duration"
                                                    value={this.state.duration}
                                                    margin="normal"
                                                    variant="outlined"
                                                    InputProps={{
                                                        endAdornment: <InputAdornment position="end">Days</InputAdornment>,
                                                        readOnly: true
                                                    }}

                                                />
                                            </FormControl>
                                            <FormControl variant="outlined" className="w-100">
                                                <TextField
                                                    required
                                                    label="Desciption"
                                                    name="description"
                                                    value={this.state.description}
                                                    onChange={this.handleChange}
                                                    margin="normal"
                                                    variant="outlined"
                                                    multiline
                                                />
                                            </FormControl>
                                        </Grid>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item className="w-100 mb-4 mt-4">
                            <Grid container spacing={0} direction="row" justify="center" alignItems="center" className="nested-grid-bot">
                                <Grid item >
                                    <ButtonGroup>
                                        <Link to="/user-page"><Button variant="text" className="mr-1" size="large" >Back</Button></Link>
                                        <Button disabled={!this.state.dataLoaded} type="submit" variant="contained">Continue</Button>
                                    </ButtonGroup>
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>

            </div>
        )
    }
}


export default CreateExperimentForm;