import React, { useState } from 'react';
import useAuth from 'hooks/useAuth';
import styled from 'styled-components';
import Sidebar from 'components/Sidebar/Sidebar';
import Button from 'components/Button/Button';
import NumberInput from 'components/NumberInput/NumberInput';
import GoalOverview from 'components/GoalOverview/GoalOverview';
import DateInput from 'components/DateInput/DateInput';
import { currentYear } from 'utils/datetime';

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.b`
  font-size: 25px;
  text-align: center;
`;

function LandingScreen() {
  const { user } = useAuth();
  const [date, setDate] = useState<Date | undefined>(new Date('02/10-2011'));
  return (
    <>
      <Sidebar />
      <Container>
        <Title>Hello {user?.displayName} !</Title>
        <Button>Hallo!</Button>
        <NumberInput placeholder="Current weight" />
        <GoalOverview
          currentWeight={115.5}
          targetWeight={85.2}
          style={{ width: 300 }}
        />
        <DateInput
          value={date}
          minYear={currentYear() - 100}
          maxYear={currentYear()}
          onChange={(d) => setDate(d)}
        />
        <Button
          onClick={() => {
            setDate(undefined);
          }}
        >
          Reset
        </Button>
      </Container>
    </>
  );
}

export default LandingScreen;
