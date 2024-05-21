import { useCallback, useEffect, useState } from 'react';
import { listFoodPictures, supabase } from './supabase';
import CurrentWeight from './CurrentWeight';
import { UploadImage } from './UploadImage';
import { Button, Divider } from '@chakra-ui/react';
import { SubmitWeightModal } from './SubmitWeightModal';

export default function LandingPage() {
  const [isSubmitWeightModalOpen, setIsSubmitWeightModalOpen] = useState(false);

  const onLogout = useCallback(async () => {
    await supabase.auth.signOut();
  }, []);

  useEffect(() => {
    listFoodPictures();
  }, []);

  return (
    <>
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
      <Button onClick={onLogout}>Log out</Button>
    </>
  );
}
