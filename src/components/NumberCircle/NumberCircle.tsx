import React from 'react';
import styled from 'styled-components';

interface CircleProps {
  size: string;
}

const Circle = styled.div.attrs<CircleProps, CircleProps>((props) => ({
  size: props.size || '25px',
}))`
  display: inline-block;
  border-radius: 50%;
  border: 2px solid;
  margin-right: 3px;

  font-size: 14px;
  font-weight: 900;
  line-height: ${(props) => props.size};

  width: ${(props) => props.size};
  height: ${(props) => props.size};
  text-align: center;
`;

interface NumberCircleProps {
  number: number;
  size?: string;
  style?: React.CSSProperties;
}

function NumberCircle({ number, size, style }: NumberCircleProps) {
  return (
    <Circle size={size} style={style}>
      {number}
    </Circle>
  );
}
NumberCircle.defaultProps = {} as Partial<NumberCircleProps>;

export default NumberCircle;
