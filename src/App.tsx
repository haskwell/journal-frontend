import { useState } from 'react';
import './App.css';

function App() {
  const api = 'https://journal-backend.haskwell.workers.dev/api';

  const [regUsername, setRegUsername] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [output, setOutput] = useState('Waiting for action...');

  const showOutput = (data: string | object) => {
    if (typeof data === 'string') {
      setOutput(data);
    } else {
      setOutput(JSON.stringify(data, null, 2));
    }
  };

  const register = async () => {
    const res = await fetch(`${api}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: regUsername, email: regEmail, password: regPassword }),
      credentials: 'include',
    });

    const data = await res.json();
    showOutput(data);
  };

  const login = async () => {
    const res = await fetch(`${api}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: loginEmail, password: loginPassword }),
      credentials: 'include',
    });

    const data = await res.json();
    showOutput(data);
  };

  const logout = async () => {
    try {
      const res = await fetch(`${api}/logout`, {
        method: 'POST',
        credentials: 'include',
      });

      const text = await res.text();
      let data;

      try {
        data = JSON.parse(text);
      } catch {
        data = text;
      }

      showOutput({
        status: res.status,
        ok: res.ok,
        response: data,
      });
    } catch (err) {
      if (err instanceof Error) {
        showOutput({ error: err.message });
      } else {
        showOutput({ error: String(err) });
      }
    };
  }

  const getMe = async () => {
    const res = await fetch(`${api}/auth/me`, {
      method: 'GET',
      credentials: 'include',
    });

    const data = await res.json();
    showOutput(data);
  };

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '2rem', maxWidth: '600px', margin: 'auto' }}>
      <h1>Journal API Tester</h1>

      <h2>Register</h2>
      <input value={regUsername} onChange={(e) => setRegUsername(e.target.value)} placeholder="Username" />
      <input value={regEmail} onChange={(e) => setRegEmail(e.target.value)} placeholder="Email" />
      <input value={regPassword} type="password" onChange={(e) => setRegPassword(e.target.value)} placeholder="Password" />
      <button onClick={register}>Register</button>

      <h2>Login</h2>
      <input value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} placeholder="Email" />
      <input value={loginPassword} type="password" onChange={(e) => setLoginPassword(e.target.value)} placeholder="Password" />
      <button onClick={login}>Login</button>

      <h2>Logout</h2>
      <button onClick={logout}>Logout</button>

      <h2>Get Authenticated User</h2>
      <button onClick={getMe}>Get /auth/me</button>

      <h2>Response</h2>
      <pre style={{ background: '#f4f4f4', padding: '1rem', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
        {output}
      </pre>
    </div>
  );
}

export default App;
