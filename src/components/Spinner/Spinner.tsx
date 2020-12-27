import React, { useContext } from 'react';
import BounceLoader from 'react-spinners/BounceLoader';
import { ThemeContext } from 'styled-components';

interface SpinnerProps {
  loading?: boolean;
  size?: number;
  color?: string;
}

function Spinner({ loading, size, color }: SpinnerProps) {
  const themeContext = useContext(ThemeContext);
  return (
    <BounceLoader
      size={size}
      color={color || themeContext.foregroundColor}
      loading={loading}
    />
  );
}
Spinner.defaultProps = {
  loading: true,
  size: 50,
} as Partial<SpinnerProps>;

export default Spinner;
