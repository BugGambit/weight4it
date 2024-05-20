import { readLastWeight } from "./supabase";
import { useQuery } from "@tanstack/react-query";

export default function CurrentWeight() {
  const getWeightQuery = useQuery({
    queryKey: ["weight", "get"],
    queryFn: readLastWeight,
  });

  if (getWeightQuery.isLoading) {
    return <p>Loading...</p>;
  }

  if (getWeightQuery.isError) {
    console.error(getWeightQuery.error);
    return <p>Error</p>;
  }

  if (getWeightQuery.data === null) {
    return <p>No recorded weight yet...</p>;
  }

  return <p>Your current weight is {getWeightQuery.data?.weightInKg} kg</p>;
}
