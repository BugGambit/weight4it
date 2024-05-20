import { useCallback } from "react";
import { addWeight, readLastWeight, supabase } from "./supabase";
import CurrentWeight from "./CurrentWeight";

export default function LandingPage() {
  const onLogout = useCallback(async () => {
    await supabase.auth.signOut();
  }, []);

  const onAddWeight = useCallback(async () => {
    await addWeight(80);
  }, []);

  const onReadWeights = useCallback(async () => {
    const lastWeight = await readLastWeight();
    console.log(lastWeight);
  }, []);

  return (
    <>
      <CurrentWeight />
      <button onClick={onLogout}>logout</button>
      <button onClick={onAddWeight}>add weight</button>
      <button onClick={onReadWeights}>read weights</button>
    </>
  );
}
