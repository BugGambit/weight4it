import React, { useState } from 'react';
import useAuth from 'hooks/useAuth';
import styled from 'styled-components';
import Sidebar from 'components/Sidebar/Sidebar';
import Button from 'components/Button/Button';
import NumberInput from 'components/NumberInput/NumberInput';
import Spinner from 'components/Spinner/Spinner';
import { useStoreActions } from 'hooks/store';
import { updateCurrentWeight } from 'store/profile';
import { useHistory } from 'react-router-dom';

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
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

function WeightScreen() {
  const history = useHistory();
  const { user } = useAuth();
  const [weight, setWeight] = useState<undefined | number>(undefined);
  const saveAMeasurement = useStoreActions(
    (actions) => actions.measurements.saveAMeasurement
  );
  const [isSaving, setIsSaving] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // don't redirect
    event.preventDefault();

    if (user?.email == null || weight === undefined) {
      return;
    }

    setIsSaving(true);
    await Promise.all([
      saveAMeasurement({
        email: user.email,
        measurement: {
          date: new Date(),
          weightInKg: weight,
        },
      }),
      updateCurrentWeight(user.email, weight),
    ]);
    history.push('/');
  };

  return (
    <>
      <Sidebar />
      <Container>
        <FormContainer onSubmit={onSubmit}>
          <NumberInput
            min={0}
            max={400}
            value={weight}
            onChange={setWeight}
            placeholder="Today's weight (kg) *"
            style={{ width: '100%' }}
            required
          />
          {!isSaving ? (
            <Button style={{ width: '100%' }} submit>
              Submit
            </Button>
          ) : (
            <Spinner size={34} />
          )}
        </FormContainer>
      </Container>
    </>
  );
}

export default WeightScreen;
