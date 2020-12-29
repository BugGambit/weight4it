import { useEffect } from 'react';
import db from 'api/database';
import useAuth from 'hooks/useAuth';
import { useStoreActions, useStoreState } from 'hooks/store';
import { FirebaseGoal } from 'store/goal';

export default function useGoal() {
  const { user } = useAuth();
  const setGoal = useStoreActions((actions) => actions.goal.setGoal);
  useEffect(() => {
    if (!user || !user.email) return () => {};
    const unsubscribe = db
      .collection('users')
      .doc(user.email)
      .onSnapshot((doc) => {
        const data = doc.data();
        if (!data) {
          setGoal(null);
          return;
        }
        const { goal: firebaseGoal } = data as {
          goal: FirebaseGoal | undefined;
        };
        setGoal(
          !firebaseGoal
            ? null
            : {
                ...firebaseGoal,
                startDate: firebaseGoal.startDate.toDate(),
              }
        );
      });
    return unsubscribe;
  }, [setGoal, user]);
  return useStoreState((state) => state.goal.data);
}
