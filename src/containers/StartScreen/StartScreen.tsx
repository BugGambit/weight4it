import React, { useState } from 'react';
import styled from 'styled-components';
import Steps from 'components/Steps/Steps';
import ProfileSettings from 'components/ProfileSettings/ProfileSettings';
import GoalSettings from 'components/GoalSettings/GoalSettings';
import { useStoreActions } from 'hooks/store';
import { Goal } from 'store/goal';
import { useHistory } from 'react-router-dom';
import { Profile } from 'store/profile';

const Container = styled.div`
  height: 100%;
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
`;

function StartScreen() {
  const history = useHistory();
  const [currentStep, setCurrentStep] = useState(0);
  const saveProfile = useStoreActions((actions) => actions.profile.saveProfile);
  const saveGoal = useStoreActions((actions) => actions.goal.saveGoal);
  const onProfileSubmit = async (p: Profile) => {
    await saveProfile(p);
    setCurrentStep(currentStep + 1);
  };
  const onGoalSubmit = async (email: string, goal: Goal) => {
    await saveGoal({
      email,
      goal,
    });
    history.push('/');
  };
  return (
    <Container>
      <Steps
        currentStep={currentStep}
        steps={['CREATE A PROFILE', 'CREATE A GOAL']}
        style={{ marginBottom: 40 }}
      />
      {currentStep === 0 && <ProfileSettings onSubmit={onProfileSubmit} />}
      {currentStep === 1 && <GoalSettings onSubmit={onGoalSubmit} />}
    </Container>
  );
}

export default StartScreen;
