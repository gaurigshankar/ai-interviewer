// pages/unauthorized.tsx

import Head from "next/head";

const Unauthorized = () => {
  return (
    <>
      <Head>
        <title>Unauthorized - AI Interviewer</title>
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md text-center">
          <h1 className="text-3xl font-bold mb-4">Unauthorized</h1>
          <p className="text-gray-700">
            You do not have permission to view this page.
          </p>
        </div>
      </div>
    </>
  );
};

export default Unauthorized;
