import { useCallback, useState } from 'react';
import { supabase } from './supabase';
import CurrentWeight from './CurrentWeight';
import { UploadImage } from './UploadImage';
import { Button, Divider, Stack } from '@chakra-ui/react';
import { SubmitWeightModal } from './SubmitWeightModal';
import { FoodPictures } from './FoodPictures';

export default function LandingPage() {
  const [isSubmitWeightModalOpen, setIsSubmitWeightModalOpen] = useState(false);
  const [date] = useState(new Date());

  const onLogout = useCallback(async () => {
    await supabase.auth.signOut();
  }, []);

  return (
    <Stack gap={5}>
      <CurrentWeight />
      <Button onClick={() => setIsSubmitWeightModalOpen(true)}>
        Submit your current weight
      </Button>
      <SubmitWeightModal
        isOpen={isSubmitWeightModalOpen}
        onClose={() => setIsSubmitWeightModalOpen(false)}
      />
      <Divider />
      <UploadImage />
      <FoodPictures date={date} />
      <Button onClick={onLogout}>Log out</Button>
    </Stack>
  );
}
