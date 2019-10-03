import React, { PureComponent } from 'react'

import { Grid, Paper, Typography, Button, IconButton, FormControl, InputLabel, Select, TextField, InputAdornment, Tooltip, ButtonGroup, } from '@material-ui/core'
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import 'date-fns';
import { differenceInCalendarDays, toDate } from 'date-fns'

import { Link } from 'react-router-dom'

class SideParameter extends PureComponent {

    static defaultProps = {
        onChangeTemplate: () => { },
        templates: []
    }

    constructor(props) {
        super(props);
        this.state = {
            template: "null",
            labelWidth: 0,
            startDate: toDate(new Date()),
            endDate: toDate(new Date()),
            duration: 0,
            heading: "",
            instructions: "",
            ExperimentID: 0
        }
        this.inputLabel = React.createRef(null)
        this.startRef = React.createRef(null)
    }

    componentDidMount() {
        this.setState({
            labelWidth: this.inputLabel.current.offsetWidth
        })
        this.reGenerateID()
    }

    handleTemplateChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
        this.props.onChangeTemplate(event.target.value)
    }

    genTemplateOptions = (templates) => {
        return templates.map(item => <option key={item.id} value={item.id}>{item.name}</option>)
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
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


    render() {
        return (
                <div className="h-100">
                    <Grid container spacing={0} direction="column" justify="space-between" alignItems="stretch" className="h-100">
                        <Grid item>
                            <Grid container spacing={2} direction="column" justify="center" alignItems="stretch" className="nested-grid-top">
                                <Grid item >
                                    <Paper className="p-4 mt-3 mx-3 d-flex align-items-baseline justify-content-between">
                                        <Typography variant="h5" display="inline" >Experiment ID:</Typography><Typography display="inline" variant="h5" className="float-right">{this.state.ExperimentID} <Tooltip title="re-generate"><IconButton onClick={this.reGenerateID} className="ml-1 px-2 py-auto"><i className="fas fa-redo fa-lg"></i></IconButton></Tooltip></Typography>
                                    </Paper>
                                </Grid>
                                <Grid item >
                                    <Paper className="p-4 mx-3">
                                        <FormControl variant="outlined" className="w-100">
                                            <InputLabel ref={this.inputLabel} htmlFor="outlined-age-native-simple">
                                                Template
                                            </InputLabel>
                                            <Select
                                                native
                                                value={this.state.template}
                                                onChange={this.handleTemplateChange}
                                                name="template"
                                                labelWidth={this.state.labelWidth}
                                            >
                                                {this.genTemplateOptions(this.props.templates)}
                                            </Select>
                                        </FormControl>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <KeyboardDatePicker
                                                disableToolbar
                                                ref={this.startRef}
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
                                                ref={this.startRef}
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
                                                label="Heading"
                                                name="heading"
                                                value={this.state.heading}
                                                onChange={this.handleChange}
                                                margin="normal"
                                                variant="outlined"
                                                multiline
                                            />
                                        </FormControl>
                                        <FormControl variant="outlined" className="w-100">
                                            <TextField
                                                label="Instructions"
                                                name="instructions"
                                                value={this.state.instructions}
                                                onChange={this.handleChange}
                                                margin="normal"
                                                variant="outlined"
                                                multiline
                                            />
                                        </FormControl>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item className="w-100 mb-4">
                            <Grid container spacing={0} direction="row" justify="center" alignItems="center" className="nested-grid-bot">
                                <Grid item >
                                    <ButtonGroup>
                                        <Link to="/"><Button variant="text" className="mr-1" size="large" >Cancel</Button></Link>
                                        <Link to={{
                                            pathname: "/",
                                            state: {
                                            }
                                        }}><Button variant="contained">Continue</Button></Link>
                                    </ButtonGroup>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
        )
    }
}


export default SideParameter;