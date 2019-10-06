import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';



export default function Steppers(props) {

  const steps = ['Personal Particulars', 'Test Trail', 'Part A', 'Part B','Yay Completed!'];

  return (
      <Stepper activeStep={props.activeStep} alternativeLabel>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
  );
}