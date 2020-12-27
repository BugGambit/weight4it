import { useState, useEffect } from 'react';
import firebase from 'firebase/app';

function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState<null | boolean>(null);
  const [user, setUser] = useState<null | firebase.User>(null);
  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((authUser) => {
        const isUserLoggedIn = !!authUser;
        setIsLoggedIn(isUserLoggedIn);
        setUser(authUser);
        if (isUserLoggedIn) {
          // const { email } = authUser;
          // window.analytics.identify(email);
        }
      });
    return unregisterAuthObserver;
  }, []);

  return { isLoggedIn, user };
}

export default useAuth;
