import Button from 'components/Button/Button';
import React from 'react';

interface FileInputProps {
  children: React.ReactNode;
  onFileSelect?: (file: File) => void;
  accept?: string;
  style?: React.CSSProperties;
}

function FileInput({
  children,
  onFileSelect = () => {},
  accept = '',
  style,
}: FileInputProps) {
  const onClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = accept;
    input.onchange = () => {
      const { files } = input;
      if (!files || files.length === 0) return;
      onFileSelect(files[0]);
    };
    input.click();
  };

  return (
    <Button style={style} onClick={onClick}>
      {children}
    </Button>
  );
}
FileInput.defaultProps = {} as Partial<FileInputProps>;

export default FileInput;
