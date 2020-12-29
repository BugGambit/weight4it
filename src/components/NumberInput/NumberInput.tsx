import React from 'react';
import styled from 'styled-components';

const InputWithStyle = styled.input`
  background-color: ${(props) => props.theme.inputBackgroundColor};
  font-size: 16px;
  font-weight: 900;
  height: 36px;
  border: 0.5px solid #264653;
  box-sizing: border-box;
  padding: 0 10px 0 10px;
  text-align: center;
  color: inherit;

  ::placeholder {
    color: ${(props) => props.theme.inputPlaceholderColor};
    opacity: 1;
  }
`;

interface NumberInputProps {
  value: number;
  onChange?: (value: number | undefined) => void;
  placeholder?: string;
  min?: number;
  max?: number;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  style?: React.CSSProperties;
}

function NumberInput({
  value,
  onChange = () => {},
  placeholder,
  min,
  max,
  disabled,
  readonly,
  required,
  style,
}: NumberInputProps) {
  return (
    <InputWithStyle
      type="number"
      value={value === undefined ? '' : value}
      onChange={(event) => {
        const valueAsString = event.target.value;
        onChange(valueAsString === '' ? undefined : Number(valueAsString));
      }}
      placeholder={placeholder}
      min={min}
      max={max}
      disabled={disabled}
      readOnly={readonly}
      required={required}
      style={style}
    />
  );
}
NumberInput.defaultProps = {} as Partial<NumberInputProps>;

export default NumberInput;
