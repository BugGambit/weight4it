import db from 'api/database';
import { useStoreActions, useStoreState } from 'hooks/store';
import useAuth from 'hooks/useAuth';
import { useEffect } from 'react';
import { FirebaseProfile } from 'store/profile';

export default function useProfile() {
  const { user } = useAuth();
  const setProfile = useStoreActions((actions) => actions.profile.setProfile);
  const profile = useStoreState((state) => state.profile.data);
  useEffect(() => {
    if (!user || !user.email) return () => {};
    const unsubscribe = db
      .collection('users')
      .doc(user.email)
      .onSnapshot((doc) => {
        const data = doc.data();
        if (!data) {
          setProfile(null);
          return;
        }
        const { profile: firebaseProfile } = data as {
          profile: FirebaseProfile | undefined;
        };
        setProfile(
          !firebaseProfile
            ? null
            : {
                ...firebaseProfile,
                dateOfBirth: firebaseProfile.dateOfBirth.toDate(),
              }
        );
      });
    return unsubscribe;
  }, [setProfile, user]);
  return profile;
}
