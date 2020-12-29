import React from 'react';
import styled from 'styled-components';

const DEFAULT = '';

const SelectWithStyle = styled.select`
  background-color: ${(props) => props.theme.inputBackgroundColor};
  font-size: 16px;
  font-weight: 900;
  height: 36px;
  border: 0.5px solid #264653;
  box-sizing: border-box;
  padding: 0 10px 0 10px;
  text-align: center;
  text-align-last: center;
  color: ${(props) =>
    props.value === DEFAULT ? props.theme.inputPlaceholderColor : 'inherit'};
`;

interface DropdownProps {
  placeholder: string;
  options: string[];
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  style?: React.CSSProperties;
  required?: boolean;
}

function Dropdown({
  value,
  placeholder,
  options,
  onChange,
  style,
  required,
}: DropdownProps) {
  return (
    <SelectWithStyle
      value={value != null ? value : DEFAULT}
      onChange={onChange}
      style={style}
      required={required}
    >
      <option value={DEFAULT} disabled>
        {placeholder}
      </option>
      {options.map((option) => (
        <option value={option} key={option}>
          {option}
        </option>
      ))}
    </SelectWithStyle>
  );
}
Dropdown.defaultProps = {} as Partial<DropdownProps>;

export default Dropdown;
