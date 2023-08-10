'use client';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const withAuthRedirect = (WrappedComponent: React.ComponentType<any>) => {
  return function WithAuthRedirect(props: any) {
    const router = useRouter();
    const auth = getAuth();
    const [userState, setUserState] = useState<UserState>({
      user: null,
      loading: true,
    });

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUserState({ user, loading: false });
        if (!user && router.pathname.startsWith('/dashboard')) {
          router.replace('/login');
        }
      });

      return () => unsubscribe();
    }, [router, auth]);

    if (userState.loading) {
      // Render a loading state if authentication status is still being determined
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuthRedirect;
