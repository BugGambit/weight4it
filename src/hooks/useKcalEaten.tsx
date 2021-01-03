import { useStoreActions, useStoreState } from 'hooks/store';
import useAuth from 'hooks/useAuth';
import { useEffect } from 'react';
import { FirebaseFood, getFoodCollectionRef } from 'store/food';
import { stringifyDate } from 'utils/datetime';

export default function useKcalEaten() {
  const { user } = useAuth();
  const setFood = useStoreActions((actions) => actions.food.setFood);
  const key = stringifyDate(new Date());
  useEffect(() => {
    if (!user || !user.email) return () => {};
    const unsubscribe = getFoodCollectionRef(user.email)
      .doc(key)
      .onSnapshot((doc) => {
        const data = doc.data();
        if (!data) {
          setFood(null);
          return;
        }
        const { items: firebaseFood } = data as {
          items: FirebaseFood[] | undefined;
        };
        setFood(
          !firebaseFood
            ? null
            : firebaseFood.map((e) => ({
                ...e,
                timestamp: e.timestamp.toDate(),
              }))
        );
      });
    return unsubscribe;
  }, [setFood, user, key]);
  return useStoreState((state) => state.food.kcalEaten);
}
