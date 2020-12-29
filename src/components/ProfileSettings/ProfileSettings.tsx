import Button from 'components/Button/Button';
import DateInput from 'components/DateInput/DateInput';
import Dropdown from 'components/Dropdown/Dropdown';
import NumberInput from 'components/NumberInput/NumberInput';
import Spinner from 'components/Spinner/Spinner';
import useAuth from 'hooks/useAuth';
import useProfile from 'hooks/useProfile';
import { findKey } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Gender, Profile } from 'store/profile';
import styled from 'styled-components';
import { currentYear } from 'utils/datetime';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  > * {
    margin: 5px 0;
  }
`;

const Label = styled.p`
  font-size: 12px;
`;

interface ProfileSettingsProps {
  onSubmit: (profile: Profile) => Promise<void>;
}

function ProfileSettings({ onSubmit }: ProfileSettingsProps) {
  const { user } = useAuth();
  const [currentWeight, setCurrentWeight] = useState<undefined | number>(
    undefined
  );
  const [gender, setGender] = useState<undefined | Gender>(undefined);
  const [height, setHeight] = useState<undefined | number>(undefined);
  const [dateOfBirth, setDateOfBirth] = useState<undefined | Date>(undefined);
  const [isSaving, setIsSaving] = useState(false);

  const profile = useProfile();
  useEffect(() => {
    if (!profile) return;
    setGender(profile.gender);
    setHeight(profile.heightInCm);
    setDateOfBirth(profile.dateOfBirth);
    setCurrentWeight(profile.currentWeightInKg);
  }, [profile]);

  const genderMap: { [key in Gender]: string } = {
    [Gender.Male]: 'Male ♂️',
    [Gender.Female]: 'Female ♀️',
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // don't redirect
    event.preventDefault();
    if (
      user?.email == null ||
      gender === undefined ||
      height === undefined ||
      dateOfBirth === undefined ||
      currentWeight === undefined
    ) {
      return;
    }

    setIsSaving(true);
    await onSubmit({
      email: user.email,
      currentWeightInKg: currentWeight,
      gender,
      heightInCm: height,
      dateOfBirth,
    });
    setIsSaving(false);
  };

  return (
    <Container>
      <FormContainer onSubmit={handleSubmit}>
        <NumberInput
          min={0}
          max={400}
          value={currentWeight}
          onChange={setCurrentWeight}
          placeholder="Current weight (kg) *"
          style={{ width: '100%' }}
          required
        />
        <Dropdown
          options={Object.values(genderMap)}
          placeholder="Gender *"
          style={{ width: '100%' }}
          value={gender ? genderMap[gender] : undefined}
          onChange={(event) => {
            setGender(
              findKey(genderMap, (el) => el === event.target.value) as Gender
            );
          }}
          required
        />
        <NumberInput
          min={0}
          max={300}
          value={height}
          onChange={setHeight}
          placeholder="Height (cm) *"
          style={{ width: '100%' }}
          required
        />
        <Label>Date of birth: *</Label>
        <DateInput
          value={dateOfBirth}
          onChange={setDateOfBirth}
          maxYear={currentYear() - 10}
          minYear={currentYear() - 100}
          style={{ width: '100%' }}
          required
        />
        {!isSaving ? (
          <Button style={{ width: '100%' }} submit>
            Next
          </Button>
        ) : (
          <Spinner size={34} />
        )}
      </FormContainer>
    </Container>
  );
}
ProfileSettings.defaultProps = {} as Partial<ProfileSettingsProps>;

export default ProfileSettings;
