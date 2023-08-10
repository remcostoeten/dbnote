'use client';
// withAuth.tsx
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const Router = useRouter();

    useEffect(() => {
      const auth = getAuth();
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (!user) {
          Router.push('/login');
        }
      });

      return () => unsubscribe();
    }, []);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;