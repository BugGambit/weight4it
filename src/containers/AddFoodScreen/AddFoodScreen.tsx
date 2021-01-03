import React, { useState } from 'react';
import useAuth from 'hooks/useAuth';
import styled from 'styled-components';
import PageWrapper from 'components/PageWrapper/PageWrapper';
import Button from 'components/Button/Button';
import NumberInput from 'components/NumberInput/NumberInput';
import Spinner from 'components/Spinner/Spinner';
import TextInput from 'components/TextInput/TextInput';
import { useStoreActions } from 'hooks/store';
import { useHistory } from 'react-router-dom';
import FileInput from 'components/FileInput/FileInput';
import { saveFoodPicture } from 'store/food';

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.form`
  padding: 10px;
  border-radius: 5px;
  outer-shadow: 2px 2px grey;
  background-color: rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;

  > * {
    margin: 5px 0;
  }
`;

const Title = styled.p`
  width: 100%;
  text-align: center;
  font-size: 20px;
`;

function AddFoodScreen() {
  const { user } = useAuth();
  const history = useHistory();
  const [kcal, setKcal] = useState<undefined | number>(undefined);
  const [name, setName] = useState('');
  const [pictureFile, setPictureFile] = useState<undefined | File>(undefined);
  const saveFood = useStoreActions((actions) => actions.food.saveFood);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // don't redirect
    event.preventDefault();
    if (user?.email == null || kcal === undefined) {
      return;
    }

    setIsSaving(true);
    const picturePath = pictureFile
      ? await saveFoodPicture(user.email, pictureFile)
      : undefined;
    await saveFood({
      email: user.email,
      food: {
        kcal,
        name,
        picturePath,
        timestamp: new Date(),
      },
    });
    history.push('/');
  };

  return (
    <PageWrapper>
      <Container>
        <Title>Add food</Title>
        <FormContainer onSubmit={handleSubmit}>
          <NumberInput
            min={0}
            value={kcal}
            onChange={setKcal}
            placeholder="Number of kcal *"
            style={{ width: '100%' }}
            required
          />
          <TextInput
            value={name}
            onChange={setName}
            placeholder="Name"
            style={{ width: '100%' }}
          />
          <FileInput
            accept="image/*"
            onFileSelect={setPictureFile}
            style={{ width: '100%', marginBottom: 30 }}
          >
            Select picture
          </FileInput>
          {!isSaving ? (
            <Button style={{ width: '100%' }} submit>
              Add food
            </Button>
          ) : (
            <Spinner size={34} />
          )}
        </FormContainer>
      </Container>
    </PageWrapper>
  );
}

export default AddFoodScreen;
