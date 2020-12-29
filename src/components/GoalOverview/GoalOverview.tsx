import React from 'react';
import styled from 'styled-components';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Repeater from 'components/Repeater/Repeater';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const WeightContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const WeightNumber = styled.p`
  margin: 0;
  font-size: 18px;
  line-height: 22px;
`;

const WeightTitle = styled.p`
  margin: 0;
  font-size: 10px;
  line-height: 22px;
  color: rgba(88, 87, 87, 0.7);
`;

const Arrow = styled(FontAwesomeIcon)`
  color: #bfbfbf;
  font-size: 19px;
  margin: 0 5px;
`;

interface GoalOverviewProps {
  currentWeight: number;
  targetWeight: number;
  style?: React.CSSProperties;
}

function GoalOverview({
  currentWeight,
  targetWeight,
  style,
}: GoalOverviewProps) {
  const renderWeight = (weight: number, title: string) => {
    return (
      <WeightContainer>
        <WeightNumber>{weight}</WeightNumber>
        <WeightTitle>{title}</WeightTitle>
      </WeightContainer>
    );
  };

  return (
    <Container style={style}>
      {renderWeight(currentWeight, 'Current weight')}
      <div>
        <Repeater times={3}>
          <Arrow icon={faArrowRight} />
        </Repeater>
      </div>
      {renderWeight(targetWeight, 'Target weight')}
    </Container>
  );
}
GoalOverview.defaultProps = {} as Partial<GoalOverviewProps>;

export default GoalOverview;
