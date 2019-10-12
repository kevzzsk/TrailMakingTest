import React, { PureComponent } from 'react'

import { Grid, Paper, Typography, Button, MenuItem, FormControl, InputLabel, Select, TextField, InputAdornment, MobileStepper, ButtonGroup, } from '@material-ui/core'
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import 'date-fns';
import { differenceInCalendarDays, toDate } from 'date-fns'

import { Link, withRouter } from 'react-router-dom'

class SideParameter extends PureComponent {

    static defaultProps = {
        onChangeTrail: () => { },
        trails: []
    }

    constructor(props) {
        super(props);
        this.state = {
            trail: props.trail,
            labelWidth: 0,
            startDate: toDate(new Date()),
            endDate: toDate(new Date()),
            duration: 0,
            heading: "",
            instructions: "",
            ExperimentID: 0,
            ExperimentName: "",
        }
        this.inputLabel = React.createRef(null)
    }

    componentDidMount() {
        this.setState({
            labelWidth: this.inputLabel.current.offsetWidth,
            ExperimentID: this.props.metaData.ExperimentID,
            ExperimentName: this.props.metaData.ExperimentName,
            startDate: this.props.metaData.startDate,
            endDate: this.props.metaData.endDate,
            duration: this.props.metaData.duration,
            trail:this.props.trail,
            heading:this.props.trail.heading,
            instructions:this.props.trail.description
        })
    }
    handleTrailChange = (event) => {
        this.setState({
            trail: this.props.metaData.trails.find((item)=> String(item.templateExperimentID)=== event.target.value),
            heading: this.props.metaData.trails.find((item)=> String(item.templateExperimentID)=== event.target.value).heading,
            instructions:this.props.metaData.trails.find((item)=> String(item.templateExperimentID)=== event.target.value).description
        })
        this.props.onChangeTrail(event.target.value)
    }

    genTemplateOptions = (templates) => {
        return templates.map(item => <option key={item.templateExperimentID} value={item.templateExperimentID}>{item.templateName}</option>)
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    goBack = () => {
        this.props.history.goBack()
    }

    getPathName = (metadata) => {
        if (metadata.numTemplates > parseInt(this.props.match.params.id)) {
            return "/user-page/create-experiment/" + (parseInt(this.props.match.params.id) + 1)
        } else {
            return "/user-page/create-experiment/completed"
        }
    }


    render() {
        return (
            <div className="h-100">
                <Grid container spacing={0} direction="column" justify="space-between" alignItems="stretch" className="h-100 sideParam-grid">
                    <Grid item>
                        <Grid container spacing={2} direction="column" justify="center" alignItems="stretch" className="nested-grid-top">
                            <Grid item >
                                <Paper className="p-4 mt-3 mx-3">
                                    <div className="d-flex align-items-baseline justify-content-between">
                                        <Typography variant="h5" display="inline" >Experiment ID:</Typography><Typography display="inline" variant="h5" className="float-right font-weight-bold">{this.state.ExperimentID}</Typography>
                                    </div>
                                    <div className="d-flex align-items-baseline justify-content-between">
                                        <Typography variant="h5" display="inline" >Experiment Name:</Typography><Typography display="inline" variant="h5" className="float-right font-weight-bold">{this.state.ExperimentName}</Typography>
                                    </div>
                                </Paper>
                            </Grid>
                            <Grid item >
                                <Paper className="p-4 mx-3">
                                    <FormControl variant="outlined" className="w-100">
                                        <InputLabel ref={this.inputLabel} htmlFor="outlined-age-native-simple">
                                            Trail
                                            </InputLabel>
                                        <Select
                                            native
                                            value={this.state.trail.templateExperimentID}
                                            onChange={this.handleTrailChange}
                                            name="trail"
                                            labelWidth={this.state.labelWidth}
                                        >  
                                            {this.genTemplateOptions(this.props.metaData.trails)}
                                        </Select>
                                    </FormControl>
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
                                            readOnly
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
                                            readOnly
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
                                            margin="normal"
                                            variant="outlined"
                                            multiline
                                            readOnly
                                        />
                                    </FormControl>
                                    <FormControl variant="outlined" className="w-100">
                                        <TextField
                                            label="Instructions"
                                            name="instructions"
                                            value={this.state.instructions}
                                            margin="normal"
                                            variant="outlined"
                                            multiline
                                            rowsMax={8}
                                            readOnly
                                        />
                                    </FormControl>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item className="w-100 mt-3">
                        <Grid container spacing={0} direction="column" justify="center" alignItems="center" className="nested-grid-bot">
                            <Grid item>
                            <MobileStepper
                                    variant="dots"
                                    steps={this.props.metaData.numTemplates}
                                    position="static"
                                    activeStep={parseInt(this.props.match.params.id)-1}
                                />
                            </Grid>
                            <Grid item >
                                <ButtonGroup>
                                    <Button variant="text" className="mr-1" size="large" onClick={this.goBack} >Back</Button>
                                    <Link to={{
                                        pathname: this.getPathName(this.props.metaData),
                                        state: {
                                            metaData: this.props.metaData,
                                            payload: [...this.props.payload, {
                                                trailName: this.state.trail.templateName,
                                                trailID: this.state.trail.templateExperimentID,
                                                heading: this.state.heading,
                                                instructions: this.state.instructions
                                            }]
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


export default withRouter(SideParameter);