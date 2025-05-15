import {
  useSteps,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  Box,
} from '@chakra-ui/react';
import { useEffect } from 'react';

type Props = {
  steps: { title: string; description: string }[]
  activeIndex?: number
}

const StepperUi = ({ steps, activeIndex = 0 }: Props) => {
  const { activeStep, setActiveStep } = useSteps({
    index: activeIndex,
    count: steps.length,
  });

  useEffect(() => {
    setActiveStep(activeIndex);
  }, [activeIndex, setActiveStep]);
  return (
    <Stepper index={activeStep}>
      {steps.map((step, index) => (
        <Step key={index}>
          <StepIndicator>
            <StepStatus
              complete={<StepIcon />}
              incomplete={<StepNumber />}
              active={<StepNumber />}
            />
          </StepIndicator>

          <Box flexShrink="0">
            <StepTitle>{step.title}</StepTitle>
            <StepDescription>{step.description}</StepDescription>
          </Box>

          <StepSeparator />
        </Step>
      ))}
    </Stepper>
  );
};

export default StepperUi;