import { InputGroup } from '@chakra-ui/react';
import { PropsWithChildren, useRef } from 'react';

type FileUploadProps = {
  accept?: string;
  multiple?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function FileUpload(props: PropsWithChildren<FileUploadProps>) {
  const { accept, multiple, children, onChange } = props;
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => inputRef.current?.click();

  return (
    <InputGroup onClick={handleClick} justifyContent={'center'}>
      <input
        type={'file'}
        multiple={multiple || false}
        hidden
        accept={accept}
        ref={inputRef}
        onChange={onChange}
      />
      <>{children}</>
    </InputGroup>
  );
}
