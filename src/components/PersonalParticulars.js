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
        metaData: {},
        activeStep: 0,
        test: false,
        id: 0,
        heading: "",
        instruction: "",
        expIndex: 0,
        data: ""
    }

    constructor(props) {
        super(props)
        this.state = {
            ExperimentID: 0,
            ExperimentName: "",
            trail: [],
            age: null,
            PastIllnesses: "",
            gender: "",
            income:null,
            incomelabelWidth: 0,
            occupation:"",
            smoker:"",
        }
        this.incomeLabel = React.createRef(null)
        this.educationLabel = React.createRef(null)
    }

    componentDidMount() {
        this.setState({
            ExperimentID: this.props.location.state.experimentID,
            incomelabelWidth:this.incomeLabel.current.offsetWidth,
            educationlabelWidth:this.educationLabel.current.offsetWidth,
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        return (
            <div className="bg-minus-app">
                <Grid container spacing={0} direction="column" justify="space-between" alignItems="stretch" className="h-100 m-auto form-container">
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
                                <Paper className="p-4 mx-3">
                                    <FormControl variant="outlined" className="w-100">
                                        <TextField
                                            required
                                            id="outlined-duration"
                                            label="Age"
                                            name="age"
                                            value={this.state.age}
                                            margin="normal"
                                            variant="outlined"
                                            type="number"
                                        />
                                    </FormControl>
                                    <FormControl component="fieldset" className="mt-2" >
                                        <FormLabel component="legend">Gender</FormLabel>
                                        <RadioGroup row aria-label="gender" name="gender" value={this.state.gender} onChange={this.handleChange}>
                                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                                            <FormControlLabel value="other" control={<Radio />} label="Other" />
                                        </RadioGroup>
                                    </FormControl>
                                    <FormControl variant="outlined" className="w-100 mb-2 pb-2">
                                        <InputLabel ref={this.incomeLabel} htmlFor="outlined-age-native-simple">
                                            Income
                                            </InputLabel>
                                        <Select
                                            native
                                            value={this.state.income}
                                            onChange={this.handleChange}
                                            name="income"
                                            labelWidth={this.state.incomelabelWidth}
                                        >  
                                            <option value=""/>
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
                                            native
                                            value={this.state.education}
                                            onChange={this.handleChange}
                                            name="education"
                                            labelWidth={this.state.educationlabelWidth}
                                        >  
                                            <option value=""/>
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
                                            label="Occupation"
                                            name="occupation"
                                            value={this.state.occupation}
                                            onChange={this.handleChange}
                                            margin="normal"
                                            variant="outlined"
                                        />
                                    </FormControl>
                                    <FormControl component="fieldset" className="mt-2" >
                                        <FormLabel component="legend">Are you a smoker?</FormLabel>
                                        <RadioGroup required row aria-label="smoker" name="smoker" value={this.state.smoker} onChange={this.handleChange}>
                                            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                            <FormControlLabel value="no" control={<Radio />} label="No" />
                                        </RadioGroup>
                                    </FormControl>
                                    <FormControl variant="outlined" className="w-100">
                                        <TextField
                                            label="Past Illnesses"
                                            name="PastIllnesses"
                                            value={this.state.PastIllnesses}
                                            onChange={this.handleChange}
                                            margin="normal"
                                            variant="outlined"
                                        />
                                    </FormControl>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item className="w-100 mb-4">
                        <Grid container spacing={0} direction="column" justify="center" alignItems="center" className="nested-grid-bot">
                            <Grid item className="w-100">
                                <Steppers activeStep={this.props.activeStep} className="p-2" />
                            </Grid>
                            <Grid item >
                                <ButtonGroup>
                                    <Button variant="text" className="mr-1" size="large" onClick={this.goBack} >Back</Button>
                                    <Link to={{
                                        pathname: '/test',
                                        state: {
                                            experimentID: this.state.ExperimentID,
                                            expIndex: this.props.expIndex,
                                            payload: this.props.data,
                                            activeStep: this.props.activeStep + 1
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



export default PersonalParticulars