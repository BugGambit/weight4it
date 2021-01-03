import React from 'react';
import RCSlider from 'rc-slider';
import 'rc-slider/assets/index.css';
import styled from 'styled-components';

const SliderWithStyle = styled(RCSlider)`
  .rc-slider-handle {
    background-color: ${(props) => props.theme.foregroundColor};
    border-radius: 0;
    border: 2px solid black;
  }

  .rc-slider-rail {
    background-color: ${(props) => props.theme.foregroundColor};
  }

  .rc-slider-step {
    background-color: ${(props) => props.theme.foregroundColor};
  }

  .rc-slider-dot {
    background-color: ${(props) => props.theme.foregroundColor};
    border: 1px solid black;
  }

  .rc-slider-mark-text {
    color: ${(props) => props.theme.foregroundColor};
  }
`;

interface SliderProps {
  value: number;
  min: number;
  max: number;
  onChange?: (value: number) => void;
  marks?: Record<number, string>;
  style?: React.CSSProperties;
}

function Slider({ value, min, max, onChange, marks, style }: SliderProps) {
  return (
    <SliderWithStyle
      value={value}
      min={min}
      max={max}
      onChange={onChange}
      marks={marks}
      style={style}
    />
  );
}
Slider.defaultProps = {} as Partial<SliderProps>;

export default Slider;
