import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useStoreActions } from 'hooks/store';
import GoalSettings from 'components/GoalSettings/GoalSettings';
import { Goal } from 'store/goal';
import PageWrapper from 'components/PageWrapper/PageWrapper';

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Text = styled.p`
  text-align: center;
  font-size: 20px;
`;

function GoalScreen() {
  const history = useHistory();
  const saveGoal = useStoreActions((actions) => actions.goal.saveGoal);
  const onSubmit = async (email: string, goal: Goal) => {
    await saveGoal({
      email,
      goal,
    });
    history.push('/');
  };

  return (
    <PageWrapper>
      <Container>
        <Text>Edit goal</Text>
        <GoalSettings onSubmit={onSubmit} />
      </Container>
    </PageWrapper>
  );
}

export default GoalScreen;
