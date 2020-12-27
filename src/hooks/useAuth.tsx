import { useState, useEffect } from 'react';
import firebase from 'firebase/app';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    analytics: any;
  }
}

function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState<null | boolean>(null);
  const [user, setUser] = useState<null | firebase.User>(null);
  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((authUser) => {
        const isUserLoggedIn = !!authUser;
        setIsLoggedIn(!!authUser);
        setUser(authUser);
        if (isUserLoggedIn) {
          const { email } = authUser as firebase.User;
          window.analytics.identify(email);
        }
      });
    return unregisterAuthObserver;
  }, []);

  return { isLoggedIn, user };
}

export default useAuth;
