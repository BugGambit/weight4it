import { useMutation } from '@tanstack/react-query';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { uploadFoodPicture } from './supabase';
import { ConfirmUploadImageModal } from './ConfirmUploadImageModal';
import { FileUpload } from './FileUpload';
import { Button, Stack } from '@chakra-ui/react';
import { queryClient } from './queryClient';
import { queryKeys } from './queryKeys';

export function UploadImage() {
  const [foodPictureFile, setFoodPictureFile] = useState<File | null>(null);
  const [foodPictureDataURL, setFoodPictureDataURL] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (!foodPictureFile) {
      setFoodPictureDataURL(null);
      return;
    }
    convertFileToDataURL(foodPictureFile).then(setFoodPictureDataURL);
  }, [foodPictureFile]);

  const { mutate, isPending } = useMutation({
    mutationFn: uploadFoodPicture,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [queryKeys.foodPictures],
      });
    },
  });

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setFoodPictureFile(file);
  }, []);

  const onConfirm = useCallback(() => {
    if (!foodPictureFile) return;
    mutate(foodPictureFile);
    setFoodPictureFile(null);
  }, [foodPictureFile]);

  if (isPending) return <div>Uploading...</div>;

  return (
    <Stack>
      <FileUpload accept="image/png, image/jpeg" onChange={onChange}>
        <Button>Upload food picture</Button>
      </FileUpload>
      <ConfirmUploadImageModal
        isOpen={!!foodPictureFile}
        imageSrc={foodPictureDataURL || ''}
        onClose={() => setFoodPictureFile(null)}
        onConfirm={onConfirm}
      />
    </Stack>
  );
}

function convertFileToDataURL(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.readAsDataURL(file);
  });
}
