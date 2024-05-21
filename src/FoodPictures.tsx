import { Image, Wrap, WrapItem } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { getFoodPicturesForADay } from './supabase';
import { queryKeys } from './queryKeys';

type Props = {
  date: Date;
};

export function FoodPictures({ date }: Props) {
  const fetchPicturesQuery = useQuery({
    queryKey: [queryKeys.foodPictures, date.toDateString()],
    queryFn: () => getFoodPicturesForADay(date),
    refetchOnWindowFocus: false,
  });

  if (fetchPicturesQuery.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Wrap align="center" justify={'center'}>
      {fetchPicturesQuery.data?.map((item) => (
        <WrapItem key={item.imageUrl}>
          <Image
            boxSize="150px"
            objectFit="scale-down"
            src={item.imageUrl}
            alt="Food picture"
          />
        </WrapItem>
      ))}
    </Wrap>
  );
}
