import React, { useState } from 'react';
import styled from 'styled-components';
import useGoal from 'hooks/useGoal';
import useProfile from 'hooks/useProfile';
import { useStoreState } from 'hooks/store';
import StartScreen from 'containers/StartScreen/StartScreen';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import PageWrapper from 'components/PageWrapper/PageWrapper';
import DailyCaloriesInfo from 'components/DailyCaloriesInfo/DailyCaloriesInfo';
import Modal from 'components/Modal/Modal';
import PictureWithDescription from 'components/PictureWithDescription/PictureWithDescription';
import LinkWithoutStyle from 'components/LinkWithoutStyle/LinkWithoutStyle';
import useKcalEaten from 'hooks/useKcalEaten';
import Footer from 'components/Footer/Footer';
import FoodImage from './food.png';

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;

  p {
    text-align: center;
  }
`;

const AddContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
  > * {
    margin: 10px;
  }
`;

const CaloriesEatenText = styled.p`
  margin-top: 20px;
`;

function LandingScreen() {
  const kcalEaten = useKcalEaten();
  const profile = useProfile();
  const goal = useGoal();
  const hasProfileBeenSet = useStoreState(
    (state) => state.profile.hasProfileBeenSet
  );
  const hasGoalBeenSet = useStoreState((state) => state.goal.hasGoalBeenSet);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const noProfile = hasProfileBeenSet && !profile;
  const noGoal = hasGoalBeenSet && !goal;
  if (noProfile || noGoal) {
    return <StartScreen />;
  }
  if (!profile) {
    return null;
  }
  return (
    <PageWrapper>
      <>
        <Container>
          <p>Your daily summary:</p>
          <DailyCaloriesInfo />
          <CaloriesEatenText>
            Calories eaten
            <br />
            {kcalEaten} kcal
          </CaloriesEatenText>
        </Container>
        <Footer icon={faPlus} onIconClick={() => setIsAddModalOpen(true)} />
        <Modal
          isOpen={isAddModalOpen}
          title="Choose to add:"
          onClose={() => setIsAddModalOpen(false)}
        >
          <AddContainer>
            <LinkWithoutStyle to="/food/add">
              <PictureWithDescription
                size="125px"
                imgSrc={FoodImage}
                imgAlt="Food"
                description="Food"
              />
            </LinkWithoutStyle>
            <LinkWithoutStyle to="/weight/add">
              <PictureWithDescription
                size="125px"
                imgSrc="https://cdn.onlinewebfonts.com/svg/img_471388.png"
                imgAlt="Weight"
                description="Weight"
              />
            </LinkWithoutStyle>
          </AddContainer>
        </Modal>
      </>
    </PageWrapper>
  );
}

export default LandingScreen;
