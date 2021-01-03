import React from 'react';
import styled from 'styled-components';

const InputWithStyle = styled.input`
  background-color: ${(props) => props.theme.backgroundColor};
  font-size: 16px;
  font-weight: 900;
  height: 36px;
  border: 0.5px solid #264653;
  box-sizing: border-box;
  padding: 0 10px 0 10px;
  text-align: center;
  color: ${(props) => props.theme.foregroundColor};
  box-shadow: 1px 1px ${(props) => props.theme.foregroundColor};
  border-radius: 5px;

  ::placeholder {
    color: ${(props) => props.theme.inputPlaceholderColor};
    opacity: 1;
  }
`;

interface TextInputProps {
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  style?: React.CSSProperties;
}

function TextInput({
  value,
  onChange = () => {},
  placeholder,
  disabled,
  readonly,
  required,
  style,
}: TextInputProps) {
  return (
    <InputWithStyle
      type="text"
      value={value === undefined ? '' : value}
      onChange={(event) => {
        const valueAsString = event.target.value;
        onChange(valueAsString);
      }}
      placeholder={placeholder}
      disabled={disabled}
      readOnly={readonly}
      required={required}
      style={style}
    />
  );
}
TextInput.defaultProps = {} as Partial<TextInputProps>;

export default TextInput;
