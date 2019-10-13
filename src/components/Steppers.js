import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';



export default function Steppers(props) {

  let steps = ['Personal Particulars', 'Test Trail'];

  steps=[...steps,...props.trails.map(trail=>trail.heading),"Yay Completed"]

  return (
      <Stepper activeStep={props.activeStep} alternativeLabel className={`${props.className}`}>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
  );
}

Steppers.defaultProps ={
  trails: [],
  activeStep:0
}