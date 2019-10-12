import React, { Component } from 'react'

import {
    TextField,
    Grid,
    Paper,
    Button,
    Typography,
    FormControl,
    FormLabel,
    RadioGroup,
    Radio,
    InputAdornment,
    ButtonGroup,
    FormControlLabel,
    InputLabel,
    Select
} from "@material-ui/core"

import { Link } from "react-router-dom"
import Steppers from './Steppers'

class PersonalParticulars extends Component {

    static defaultProps = {
        trail: "",
        activeStep: 0,
        test: false,
        id: 0,
        data: ""
    }

    constructor(props) {
        super(props)
        this.state = {
            ExperimentID: 0,
            ExperimentName: "",
            trail: [],
            age: null,
            pastIllnesses: "",
            gender: "male",
            income: null,
            incomelabelWidth: 0,
            occupation: "",
            smoker: "no",
            exercise: ""
        }
        this.incomeLabel = React.createRef(null)
        this.educationLabel = React.createRef(null)
        this.exerciseLabel = React.createRef(null)
        this.required = false // for debugging purposes
    }

    componentDidMount() {
        this.setState({
            ExperimentID: this.props.location.state.experimentID,
            incomelabelWidth: this.incomeLabel.current.offsetWidth,
            exerciseLabelWidth: this.exerciseLabel.current.offsetWidth,
            educationlabelWidth: this.educationLabel.current.offsetWidth,
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        console.log("SUBMIT")
        this.props.history.push({
            pathname: '/test',
            state: {
                experimentID: this.state.ExperimentID,
                expIndex: this.props.location.state.expIndex,
                payload: this.props.data,
                activeStep: this.props.location.state.activeStep + 1,
                participantDetails: {
                    "age": this.state.age,
                    "gender": this.state.gender,
                    "income": this.state.income,
                    "education": this.state.education,
                    "occupation": this.state.occupation,
                    "smoker": this.state.smoker,
                    "pastIllnesses": this.state.pastIllnesses,
                    "exercise": this.state.exercise,
                },
                trail:this.props.location.state.trails
            }
        })
    }

    render() {
        return (
            <div className="bg-minus-app">
                <Grid container spacing={0} direction="column" justify="space-between" alignItems="stretch" className="h-100 m-auto form-container">

                    <form onSubmit={this.handleSubmit}>
                        <Grid item>
                            <Grid container spacing={2} direction="column" justify="center" alignItems="stretch" className="nested-grid-top">
                                <Grid item >
                                    <Paper className="p-4 mt-3 mx-3">
                                        <div className="d-flex align-items-baseline justify-content-between">
                                            <Typography variant="h5" display="inline" >Experiment ID:</Typography><Typography display="inline" variant="h5" className="float-right font-weight-bold">{this.state.ExperimentID}</Typography>
                                        </div>
                                    </Paper>
                                </Grid>
                                <Grid item >
                                    <Paper className="p-4 mx-3 mb-2">
                                        <FormControl variant="outlined" className="w-100">
                                            <TextField
                                                required= {this.required}
                                                id="outlined-duration"
                                                label="Age"
                                                name="age"
                                                onChange={this.handleChange}
                                                value={this.state.age}
                                                margin="normal"
                                                variant="outlined"
                                                type="number"
                                            />
                                        </FormControl>
                                        <FormControl component="fieldset" className="ml-1 mt-2" >
                                            <FormLabel component="legend">Gender</FormLabel>
                                            <RadioGroup row aria-label="gender" name="gender" value={this.state.gender} onChange={this.handleChange} className="ml-2">
                                                <FormControlLabel value="male" control={<Radio color="primary" />} label="Male" />
                                                <FormControlLabel value="female" control={<Radio color="primary" />} label="Female" />
                                                <FormControlLabel value="other" control={<Radio color="primary" />} label="Other" />
                                            </RadioGroup>
                                        </FormControl>
                                        <FormControl variant="outlined" className="w-100 mb-2 pb-2">
                                            <InputLabel ref={this.incomeLabel} htmlFor="outlined-age-native-simple">
                                                Income In Previous Year
                                            </InputLabel>
                                            <Select
                                                required= {this.required}
                                                native
                                                value={this.state.income}
                                                onChange={this.handleChange}
                                                name="income"
                                                labelWidth={this.state.incomelabelWidth}
                                            >
                                                <option value="" />
                                                <option value={0}>$0</option>
                                                <option value={1}>$1 to $9,999</option>
                                                <option value={2}>$10,000 to $24,999</option>
                                                <option value={3}>$25,000 to $49,999</option>
                                                <option value={4}>$50,000 to $74,999</option>
                                                <option value={5}>$75,000 to $99,999</option>
                                                <option value={6}>$100,000 to $ 149,999</option>
                                                <option value={7}>$150,000 and greater</option>
                                                <option value={8}>Prefer not to answer</option>
                                            </Select>
                                        </FormControl>
                                        <FormControl variant="outlined" className="w-100">
                                            <InputLabel ref={this.educationLabel} htmlFor="outlined-age-native-simple">
                                                Education
                                            </InputLabel>
                                            <Select
                                                required= {this.required}
                                                native
                                                value={this.state.education}
                                                onChange={this.handleChange}
                                                name="education"
                                                labelWidth={this.state.educationlabelWidth}
                                            >
                                                <option value="" />
                                                <option value={0}>No Schooling Completed</option>
                                                <option value={1}>Primary Education</option>
                                                <option value={2}>Secondary Education</option>
                                                <option value={3}>Diploma</option>
                                                <option value={4}>Tertiary Education</option>
                                                <option value={5}>Bachelor's degree</option>
                                                <option value={6}>Master's degree</option>
                                                <option value={7}>Professional degree</option>
                                                <option value={8}>Doctorate degree</option>
                                            </Select>
                                        </FormControl>
                                        <FormControl variant="outlined" className="w-100">
                                            <TextField
                                                required= {this.required}
                                                label="Occupation"
                                                name="occupation"
                                                value={this.state.occupation}
                                                onChange={this.handleChange}
                                                margin="normal"
                                                variant="outlined"
                                            />
                                        </FormControl>
                                        <FormControl component="fieldset" className="ml-1 mt-2" >
                                            <FormLabel component="legend">Are you a smoker?</FormLabel>
                                            <RadioGroup row aria-label="smoker" name="smoker" value={this.state.smoker} onChange={this.handleChange} className="ml-2">
                                                <FormControlLabel value="no" control={<Radio color="primary" />} label="No" />
                                                <FormControlLabel value="yes" control={<Radio color="primary" />} label="Yes" />
                                            </RadioGroup>
                                        </FormControl>
                                        <FormControl variant="outlined" className="w-100 mt-n2 pt-n1">
                                            <TextField
                                                required= {this.required}
                                                label="Past Illnesses"
                                                name="pastIllnesses"
                                                value={this.state.pastIllnesses}
                                                onChange={this.handleChange}
                                                margin="normal"
                                                variant="outlined"
                                            />
                                        </FormControl>
                                        <FormControl variant="outlined" className="w-100 mt-2">
                                            <InputLabel ref={this.exerciseLabel} htmlFor="outlined-age-native-simple">
                                                How Often Do You Exercise?
                                            </InputLabel>
                                            <Select
                                                required= {this.required}
                                                native
                                                value={this.state.exercise}
                                                onChange={this.handleChange}
                                                name="exercise"
                                                labelWidth={this.state.exerciseLabelWidth}
                                            >
                                                <option value="" />
                                                <option value={0}>Every day</option>
                                                <option value={1}>More than twice a week</option>
                                                <option value={2}>Once a week</option>
                                                <option value={3}>More than twice a month</option>
                                                <option value={4}>Once a month</option>
                                                <option value={5}>Never at all</option>
                                            </Select>
                                        </FormControl>

                                    </Paper>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item className="w-100 mb-4 mt-2">
                            <Grid container spacing={0} direction="column" justify="center" alignItems="center" className="nested-grid-bot">
                                <Grid item className="w-100">
                                    <Steppers activeStep={this.props.activeStep} className="p-2" />
                                </Grid>
                                <Grid item >
                                    <ButtonGroup>
                                        <Button variant="text" className="mr-1" size="large" onClick={()=> this.props.history.goBack()} >Back</Button>
                                        <Button variant="contained" type="submit">Continue</Button>
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



export default PersonalParticulars