import React from 'react';
import useAuth from 'hooks/useAuth';
import styled from 'styled-components';
import Sidebar from 'components/Sidebar/Sidebar';
import GoalOverview from 'components/GoalOverview/GoalOverview';
import useGoal from 'hooks/useGoal';
import useProfile from 'hooks/useProfile';
import { useStoreState } from 'hooks/store';
import StartScreen from 'containers/StartScreen/StartScreen';
import Button from 'components/Button/Button';
import { Link } from 'react-router-dom';

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const Title = styled.b`
  font-size: 25px;
  text-align: center;
  margin-bottom: 40px;
`;

function LandingScreen() {
  const { user } = useAuth();
  const profile = useProfile();
  const goal = useGoal();
  const hasProfileBeenSet = useStoreState(
    (state) => state.profile.hasProfileBeenSet
  );
  const hasGoalBeenSet = useStoreState((state) => state.goal.hasGoalBeenSet);
  const noProfile = hasProfileBeenSet && !profile;
  const noGoal = hasGoalBeenSet && !goal;
  if (noProfile || noGoal) {
    return <StartScreen />;
  }
  return (
    <>
      <Sidebar />
      <Container>
        <Title>Hello {user?.displayName} !</Title>
        <Link to="/weight">
          <Button>Add today&apos;s weight</Button>
        </Link>
        {goal && (
          <GoalOverview
            startWeight={goal.startWeight}
            targetWeight={goal.targetWeight}
          />
        )}
      </Container>
    </>
  );
}

export default LandingScreen;
