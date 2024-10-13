// components/withAuth.tsx

import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { FC, ComponentType, useEffect } from "react";

const withAuth = (WrappedComponent: ComponentType, requiredRole?: string): FC => {
  const ComponentWithAuth = (props: any) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (status === "loading") return; // Do nothing while loading
      if (!session) {
        signIn(); // Redirect to login if not authenticated
      } else if (requiredRole && session.user?.role !== requiredRole) {
        router.push("/unauthorized"); // Redirect if role doesn"t match
      }
    }, [session, status, router]);

    if (status === "loading" || !session || (requiredRole && session.user?.role !== requiredRole)) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
};

export default withAuth;
