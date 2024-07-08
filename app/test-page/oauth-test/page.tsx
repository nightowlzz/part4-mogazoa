'use client';

import React, { useState } from 'react';
import { useRegisterOAuthApp } from '@/hooks/oauth';
import { useOauthSignUp, useOauthSignIn } from '@/hooks/auth';

const OAuthTestPage: React.FC = () => {
  const [appKey, setAppKey] = useState<string>('');
  const [provider, setProvider] = useState<'google' | 'kakao'>('google');
  const [redirectUri, setRedirectUri] = useState<string>('');
  const [token, setToken] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');

  const registerOAuthApp = useRegisterOAuthApp();
  const oauthSignUp = useOauthSignUp(provider);
  const oauthSignIn = useOauthSignIn(provider);

  const handleRegisterApp = () => {
    registerOAuthApp({ appKey, provider });
  };

  const handleOAuthSignUp = () => {
    oauthSignUp({ nickname, redirectUri, token });
  };

  const handleOAuthSignIn = () => {
    oauthSignIn({ redirectUri, token });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">OAuth Test Page</h1>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">Register OAuth App</h2>
        <input
          type="text"
          value={appKey}
          onChange={(e) => setAppKey(e.target.value)}
          placeholder="App Key"
          className="border rounded px-2 py-1 mr-2"
        />
        <select
          value={provider}
          onChange={(e) => setProvider(e.target.value as 'google' | 'kakao')}
          className="border rounded px-2 py-1 mr-2"
        >
          <option value="google">Google</option>
          <option value="kakao">Kakao</option>
        </select>
        <button
          onClick={handleRegisterApp}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Register App
        </button>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">OAuth Sign Up</h2>
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="Nickname"
          className="border rounded px-2 py-1 mr-2"
        />
        <input
          type="text"
          value={redirectUri}
          onChange={(e) => setRedirectUri(e.target.value)}
          placeholder="Redirect URI"
          className="border rounded px-2 py-1 mr-2"
        />
        <input
          type="text"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Token"
          className="border rounded px-2 py-1 mr-2"
        />
        <button
          onClick={handleOAuthSignUp}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          OAuth Sign Up
        </button>
      </div>

      <div>
        <h2 className="text-xl font-semibold">OAuth Sign In</h2>
        <input
          type="text"
          value={redirectUri}
          onChange={(e) => setRedirectUri(e.target.value)}
          placeholder="Redirect URI"
          className="border rounded px-2 py-1 mr-2"
        />
        <input
          type="text"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Token"
          className="border rounded px-2 py-1 mr-2"
        />
        <button
          onClick={handleOAuthSignIn}
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
        >
          OAuth Sign In
        </button>
      </div>
    </div>
  );
};

export default OAuthTestPage;
