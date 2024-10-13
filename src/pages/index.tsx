// pages/index.tsx

import { useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";

const Home = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Do nothing while loading
    if (!session) {
      signIn(); // Redirect to login if not authenticated
    } else {
      // Redirect based on role
      if (session.user?.role === "admin") {
        router.push("/admin");
      } else if (session.user?.role === "interviewer") {
        router.push("/interviewer");
      } else if (session.user?.role === "interviewee") {
        router.push("/interviewee");
      }
    }
  }, [session, status, router]);

  return (
    <>
      <Head>
        <title>AI Interviewer</title>
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p>Loading...</p>
      </div>
    </>
  );
};

export default Home;
