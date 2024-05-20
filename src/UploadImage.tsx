import { useMutation } from '@tanstack/react-query';
import { ChangeEvent, useCallback } from 'react';
import { uploadFoodPicture } from './supabase';

export function UploadImage() {
  const { mutate, isPending } = useMutation({
    mutationFn: uploadFoodPicture,
  });

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    mutate(file);
  }, []);

  if (isPending) return <div>Uploading...</div>;

  return (
    <div>
      <label>
        Your Image File
        <input
          type="file"
          name="myImage"
          accept="image/png, image/jpeg"
          onChange={onChange}
        />
      </label>
    </div>
  );
}
