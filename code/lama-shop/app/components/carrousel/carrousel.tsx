import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { Box, Paper, Typography, MobileStepper, Button } from '@mui/material';
import React, { useEffect, useRef } from 'react';

type CarrouselStep = {
  id: string;
  label: React.ReactNode | string;
  content: React.ReactNode | string;
};

interface CorrouselProps {
  steps: CarrouselStep[];
  startingIndex?: number;
}
// https://mui.com/material-ui/react-stepper/#text-with-carousel-effect
const Carrousel: React.FC<CorrouselProps> = (props) => {
  const [activeStep, setActiveStep] = React.useState(props.startingIndex ?? 0);
  const maxSteps = props.steps.length;

  const slideContainer = useRef<HTMLElement>(null)

  useEffect(() => {
    if(!slideContainer?.current){
      return;
    }
    const element = slideContainer.current.querySelector(`#step${activeStep}`); 
    element?.scrollIntoView(); 
  }, [activeStep])
  

  if (maxSteps <= 0) {
    return <></>;
  }

  const handleNext = () => {
    handleStepChange(activeStep + 1);
  };

  const handleBack = () => {
    handleStepChange(activeStep - 1);
  };

  const handleStepChange = (step: number) => {
    if (step < 0) {
      step = maxSteps - 1;
    } else if (step === maxSteps) {
      step = 0;
    }
    setActiveStep(step); 
  };
   
  return (
    <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
      <Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: 50,
          pl: 2,
          bgcolor: 'background.default',
        }}
      >
        <Typography>{props.steps[activeStep].label}</Typography>
      </Paper>

      <Box  display="flex"
            overflow="hidden"
            ref={slideContainer}
            sx={{ scrollBehavior: 'smooth' }}>
        {props.steps.map((step, index) => (
            <Box key={step.id} id={`step${index}`} flex="1 0 100%" display="flex"  width={"100%"}>{step.content}</Box> 
        ))}
      </Box>

      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            // disabled={activeStep === maxSteps - 1}
          >
            Next
            <KeyboardArrowRight />
          </Button>
        }
        backButton={
          <Button
            size="small"
            onClick={handleBack}
            //    disabled={activeStep === 0}
          >
            <KeyboardArrowLeft />
            Back
          </Button>
        }
      />
    </Box>
  );
};

export default Carrousel;
