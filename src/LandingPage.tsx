import { useCallback } from 'react';
import { readLastWeight, supabase } from './supabase';
import CurrentWeight from './CurrentWeight';
import NewWeight from './NewWeight';
import { UploadImage } from './UploadImage';

export default function LandingPage() {
  const onLogout = useCallback(async () => {
    await supabase.auth.signOut();
  }, []);

  const onReadWeights = useCallback(async () => {
    const lastWeight = await readLastWeight();
    console.log(lastWeight);
  }, []);

  return (
    <>
      <CurrentWeight />
      <NewWeight />
      <UploadImage />
      <button onClick={onLogout}>logout</button>
      <button onClick={onReadWeights}>read weights</button>
    </>
  );
}
