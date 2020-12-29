import React from 'react';
import RCSlider from 'rc-slider';
import 'rc-slider/assets/index.css';

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
    <RCSlider
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
