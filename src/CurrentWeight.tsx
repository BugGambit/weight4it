import { daysBetween, isToday } from './dateUtils';
import { readLastWeight } from './supabase';
import { useQuery } from '@tanstack/react-query';

export default function CurrentWeight() {
  const getWeightQuery = useQuery({
    queryKey: ['weight', 'get'],
    queryFn: readLastWeight,
  });

  if (getWeightQuery.isLoading) {
    return <p>Loading...</p>;
  }

  if (getWeightQuery.isError) {
    console.error(getWeightQuery.error);
    return <p>Error</p>;
  }

  if (!getWeightQuery.data) {
    return <p>No recorded weight yet...</p>;
  }

  const { weightInKg, createdAt } = getWeightQuery.data;

  if (isToday(createdAt)) {
    return <p>Your current weight is {weightInKg} kg</p>;
  }

  return (
    <p>
      Your last measured weight is {weightInKg} kg (
      {daysBetween(createdAt, new Date())} day(s) ago)
    </p>
  );
}
