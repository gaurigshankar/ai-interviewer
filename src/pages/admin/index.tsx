// pages/admin/index.tsx

import withAuth from "../../components/withAuth";
import Head from "next/head";
import { signOut, useSession } from "next-auth/react";

const AdminDashboard = () => {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Admin Dashboard - AI Interviewer</title>
      </Head>
      <div className="min-h-screen bg-gray-100 p-8">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <button
            onClick={() => signOut({ callbackUrl: "/auth/login" })}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
          >
            Logout
          </button>
        </header>
        <main>
          <p>Welcome, {session?.user?.name}!</p>
          {/* Add admin functionalities here */}
        </main>
      </div>
    </>
  );
};

export default withAuth(AdminDashboard, "admin");
