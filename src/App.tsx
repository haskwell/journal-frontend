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

      const data = await res.json();
      showOutput(data); // same as register, login, etc.
    } catch (err) {
      if (err instanceof Error) {
        showOutput({ error: err.message });
      } else {
        showOutput({ error: String(err) });
      }
    }
  }

  const getMe = async () => {
    try {
      const res = await fetch(`${api}/auth/me`, {
        method: 'GET',
        credentials: 'include',
      });

      const data = await res.json();
      showOutput(data);
    } catch (err) {
      // If the response is not valid JSON, this will catch the error
      if (err instanceof Error) {
        showOutput({ success: false, message: err.message, data: null });
      } else {
        showOutput({ success: false, message: String(err), data: null });
      }
    }
  };


return (
  <div
    style={{
      fontFamily: 'system-ui, sans-serif',
      padding: '2rem',
      maxWidth: '600px',
      margin: 'auto',
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    }}
  >
    <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>📝 Journal API Tester</h1>

    {/* Section */}
    <section style={{ marginBottom: '2rem' }}>
      <h2>Register</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <input value={regUsername} onChange={(e) => setRegUsername(e.target.value)} placeholder="Username" />
        <input value={regEmail} onChange={(e) => setRegEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={regPassword} onChange={(e) => setRegPassword(e.target.value)} placeholder="Password" />
        <button onClick={register}>Register</button>
      </div>
    </section>

    {/* Section */}
    <section style={{ marginBottom: '2rem' }}>
      <h2>Login</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <input value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} placeholder="Password" />
        <button onClick={login}>Login</button>
      </div>
    </section>

    {/* Buttons */}
    <section style={{ marginBottom: '2rem' }}>
      <h2>Session</h2>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <button onClick={logout}>Logout</button>
        <button onClick={getMe}>Get /auth/me</button>
      </div>
    </section>

    {/* Response */}
    <section>
      <h2>Response</h2>
      <pre
        style={{
          background: '#eef2f7',
          padding: '1rem',
          borderRadius: '4px',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          fontSize: '0.9rem',
          lineHeight: '1.4',
        }}
      >
        {output}
      </pre>
    </section>
  </div>
);

}

export default App;
