import NumberCircle from 'components/NumberCircle/NumberCircle';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  font-weight: 900;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  font-size: 10px;
`;

interface StepProps {
  active: boolean;
}

const Step = styled.span.attrs<StepProps, StepProps>((props) => ({
  active: props.active,
}))`
  padding: 10px;
  ${(props) => (props.active ? 'border-bottom: 4px solid red;' : '')}
`;

interface StepsProps {
  steps: string[];
  currentStep: number;
  style?: React.CSSProperties;
}

function Steps({ steps, currentStep, style }: StepsProps) {
  return (
    <Container style={style}>
      {steps.map((step, index) => {
        return (
          <Step key={step} active={index === currentStep}>
            <NumberCircle number={index + 1} />
            {step}
          </Step>
        );
      })}
    </Container>
  );
}
Steps.defaultProps = {} as Partial<StepsProps>;

export default Steps;
