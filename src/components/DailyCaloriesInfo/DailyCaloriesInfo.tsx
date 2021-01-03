import useKcalEaten from 'hooks/useKcalEaten';
import useProfile from 'hooks/useProfile';
import React from 'react';
import styled from 'styled-components';
import { calculateDailyKiloCalories } from 'utils/calories';
import { getYearsDifference } from 'utils/datetime';
import { Progress } from 'antd';

const Container = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: ${(props) => props.theme.foregroundColor};

  position: relative;
  text-align: center;
  width: 150px;
  height: 150px;

  > p {
    margin: 0;
    width: 100%;
    position: absolute;
    font-size: 15px;
    vertical-align: center;
    color: ${(props) => props.theme.foregroundColor};
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

function DailyCaloriesInfo() {
  const profile = useProfile();
  const kcalEaten = useKcalEaten();
  let dailyCaloriesUsedInPercent = 0;
  let remainingCalories = 0;
  if (profile) {
    const { gender, currentWeightInKg, heightInCm } = profile;
    const ageInYears = getYearsDifference(profile.dateOfBirth, new Date());
    const dailyCalories = calculateDailyKiloCalories(
      gender,
      currentWeightInKg,
      heightInCm,
      ageInYears
    );
    dailyCaloriesUsedInPercent = Math.ceil((kcalEaten / dailyCalories) * 100);
    remainingCalories = Math.floor(dailyCalories - kcalEaten);
  }
  return (
    <Container>
      <Progress
        type="circle"
        percent={dailyCaloriesUsedInPercent}
        width={150}
        format={() => ''}
      />
      <p>
        Remaining
        <br />
        {remainingCalories} kcal
        <br />
        {dailyCaloriesUsedInPercent} %
      </p>
    </Container>
  );
}

export default DailyCaloriesInfo;
