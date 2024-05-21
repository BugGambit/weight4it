import { Image, Stack } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { getFoodPicturesForADay } from './supabase';

type Props = {
  date: Date;
};

export function FoodPictures({ date }: Props) {
  const fetchPicturesQuery = useQuery({
    queryKey: ['foodPictures', date.toDateString()],
    queryFn: () => getFoodPicturesForADay(date),
  });

  if (fetchPicturesQuery.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Stack direction="row">
      {fetchPicturesQuery.data?.map((item) => (
        <Image
          boxSize="200px"
          objectFit="scale-down"
          src={item.imageUrl}
          alt="Food picture"
        />
      ))}
    </Stack>
  );
}
