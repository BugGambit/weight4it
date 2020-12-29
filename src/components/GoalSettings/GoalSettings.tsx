import React, { useEffect, useState } from 'react';
import useAuth from 'hooks/useAuth';
import styled from 'styled-components';
import Button from 'components/Button/Button';
import Spinner from 'components/Spinner/Spinner';
import Slider from 'components/Slider/Slider';
import {
  generateWeightLossPlan,
  healtyBMIRange,
  idealWeight,
} from 'utils/calories';
import useProfile from 'hooks/useProfile';
import { addDays, dateToYMD } from 'utils/datetime';
import useGoal from 'hooks/useGoal';
import { Goal } from 'store/goal';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 250px;

  > * {
    margin: 5px 0;
  }
`;

const Text = styled.p`
  text-align: center;
  font-size: 15px;
`;

interface GoalSettingsProps {
  onSubmit: (email: string, goal: Goal) => Promise<void>;
}

function GoalSettings({ onSubmit }: GoalSettingsProps) {
  const { user } = useAuth();
  const profile = useProfile();
  const goal = useGoal();
  const [targetWeight, setTargetWeight] = useState<undefined | number>(
    undefined
  );
  const [isSaving, setIsSaving] = useState(false);
  const idealWeightInKg = profile
    ? Math.round(idealWeight(profile.gender, profile.heightInCm))
    : 0;
  useEffect(() => {
    setTargetWeight(idealWeightInKg);
  }, [idealWeightInKg]);

  useEffect(() => {
    if (!goal) return;
    setTargetWeight(goal.targetWeight);
  }, [goal]);

  if (!profile) return null;
  const bmiRange = healtyBMIRange(profile.heightInCm);
  const minTargetWeight = Math.floor(bmiRange.min);
  const maxTargetWeight = Math.ceil(bmiRange.max);
  const weightLossPlan = generateWeightLossPlan(
    profile.currentWeightInKg,
    targetWeight || profile.currentWeightInKg
  );
  const achievementDay = addDays(new Date(), weightLossPlan.length);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // don't redirect
    event.preventDefault();
    if (user?.email == null || targetWeight === undefined) {
      return;
    }

    setIsSaving(true);
    await onSubmit(user?.email, {
      startDate: new Date(),
      startWeight: profile.currentWeightInKg,
      targetWeight,
    });

    setIsSaving(false);
  };

  return (
    <Container>
      <FormContainer onSubmit={handleSubmit}>
        <Text>
          Estimated time to achieve goal:
          <br />
          {weightLossPlan.length} days ({dateToYMD(achievementDay)})
        </Text>

        <Text>
          Adjust target weight below: {targetWeight} kg
          <br />
        </Text>
        <Slider
          value={targetWeight}
          min={Math.floor(bmiRange.min)}
          max={Math.ceil(bmiRange.max)}
          marks={{
            [minTargetWeight]: `${minTargetWeight} kg`,
            [maxTargetWeight]: `${maxTargetWeight} kg`,
            // [idealWeightInKg]: 'ideal',
          }}
          onChange={setTargetWeight}
          style={{
            width: '100%',
            marginBottom: '20px',
          }}
        />
        <Text>Healthy weight range</Text>

        {!isSaving ? (
          <Button style={{ width: '100%' }} submit>
            Submit
          </Button>
        ) : (
          <Spinner size={34} />
        )}
      </FormContainer>
    </Container>
  );
}

export default GoalSettings;
