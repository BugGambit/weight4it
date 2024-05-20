import { ChangeEvent, useCallback, useState } from 'react';
import { queryClient } from './queryClient';
import { addWeight } from './supabase';
import { useMutation } from '@tanstack/react-query';

export default function NewWeight() {
  const [weight, setWeight] = useState<number | null>(null);
  const { mutate, error, isPending } = useMutation({
    mutationFn: addWeight,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['weight', 'get'] });
    },
  });

  const onWeightChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === '') {
      setWeight(null);
      return;
    }
    setWeight(Number(event.target.value));
  }, []);

  const onSubmit = useCallback(async () => {
    if (weight === null) {
      return;
    }
    mutate(weight);
  }, [weight]);

  if (error) {
    console.error(error);
    return <p>error</p>;
  }

  if (isPending) {
    return <p>submitting...</p>;
  }

  return (
    <div>
      <input
        type="number"
        min="0"
        max="500"
        value={weight ?? ''}
        onChange={onWeightChange}
      />
      <button onClick={onSubmit}>submit</button>
    </div>
  );
}
