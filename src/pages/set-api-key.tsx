// pages/set-api-key.tsx

import { useState } from 'react';
import { useRouter } from 'next/router';

const SetApiKey = () => {
  const [apiKey, setApiKey] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Set the API key in a cookie
    document.cookie = `apiKey=${apiKey}; path=/`;

    // Redirect to the home page
    router.push('/');
  };

  return (
    <div>
      <h1>Set OpenAI API Key</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Enter your OpenAI API Key"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          required
        />
        <button type="submit">Save API Key</button>
      </form>
    </div>
  );
};

export default SetApiKey;
