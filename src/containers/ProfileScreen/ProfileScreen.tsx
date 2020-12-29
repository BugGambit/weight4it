import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Dropdown from 'components/Dropdown/Dropdown';
import NumberInput from 'components/NumberInput/NumberInput';
import DateInput from 'components/DateInput/DateInput';
import { currentYear } from 'utils/datetime';
import Button from 'components/Button/Button';
import { useStoreActions } from 'hooks/store';
import { Gender } from 'store/profile';
import Spinner from 'components/Spinner/Spinner';
import { useHistory } from 'react-router-dom';
import useAuth from 'hooks/useAuth';
import useProfile from 'hooks/useProfile';
import findKey from 'lodash/findKey';

const Container = styled.div`
  height: 100%;
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

function ProfileScreen() {
  const history = useHistory();
  const { user } = useAuth();
  const [currentWeight, setCurrentWeight] = useState<undefined | number>(
    undefined
  );
  const [gender, setGender] = useState<undefined | Gender>(undefined);
  const [height, setHeight] = useState<undefined | number>(undefined);
  const [dateOfBirth, setDateOfBirth] = useState<undefined | Date>(undefined);
  const [isSaving, setIsSaving] = useState(false);

  const profile = useProfile();
  const hasProfile = !!profile;
  useEffect(() => {
    if (!profile) return;
    setGender(profile.gender);
    setHeight(profile.heightInCm);
    setDateOfBirth(profile.dateOfBirth);
    setCurrentWeight(profile.currentWeight);
  }, [profile]);

  const genderMap: { [key in Gender]: string } = {
    [Gender.Male]: 'Male ♂️',
    [Gender.Female]: 'Female ♀️',
  };

  const saveProfile = useStoreActions((actions) => actions.profile.saveProfile);
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
    await saveProfile({
      email: user?.email,
      dateOfBirth,
      gender,
      heightInCm: height,
      currentWeight,
    });

    history.push('/');
  };

  return (
    <Container>
      <p>{hasProfile ? 'Edit profile' : 'Create a profile'}</p>
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
            SUBMIT
          </Button>
        ) : (
          <Spinner size={34} />
        )}
      </FormContainer>
    </Container>
  );
}

export default ProfileScreen;
