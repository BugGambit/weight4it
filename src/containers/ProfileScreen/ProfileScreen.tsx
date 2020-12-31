import React from 'react';
import { useStoreActions } from 'hooks/store';
import { Profile } from 'store/profile';
import { useHistory } from 'react-router-dom';
import ProfileSettings from 'components/ProfileSettings/ProfileSettings';
import styled from 'styled-components';
import useProfile from 'hooks/useProfile';
import Sidebar from 'components/Sidebar/Sidebar';

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.p`
  width: 100%;
  text-align: center;
  font-size: 20px;
`;

function ProfileScreen() {
  const history = useHistory();
  const profile = useProfile();
  const hasProfile = !!profile;
  const saveProfile = useStoreActions((actions) => actions.profile.saveProfile);
  const onSubmit = async (p: Profile) => {
    await saveProfile(p);
    history.push('/');
  };

  return (
    <>
      <Sidebar />
      <Container>
        <Title>{hasProfile ? 'Edit profile' : 'Create a profile'}</Title>
        <ProfileSettings onSubmit={onSubmit} />
      </Container>
    </>
  );
}

export default ProfileScreen;
