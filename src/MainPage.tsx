import { useState } from "react";

function MainPage() {
  //const api = "http://localhost:8787/api";
  const api = 'https://journal-backend.haskwell.workers.dev/api';
  const [regUsername, setRegUsername] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [resetEmail, setResetEmail] = useState('');

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
    const res = await fetch(`${api}/logout`, {
      method: 'POST',
      credentials: 'include',
    });

    const data = await res.json();
    showOutput(data);
  };

  const getMe = async () => {
    const res = await fetch(`${api}/auth/me`, {
      method: 'GET',
      credentials: 'include',
    });

    const data = await res.json();
    showOutput(data);
  };

  const requestPasswordReset = async () => {
    const res = await fetch(`${api}/password-reset-request`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: resetEmail }),
    });

    const data = await res.json();
    showOutput(data);
  };

  return (
    <div className="container">
      <h1>📝 Journal API Tester</h1>

      <section>
        <h2>Register</h2>
        <input value={regUsername} onChange={(e) => setRegUsername(e.target.value)} placeholder="Username" />
        <input value={regEmail} onChange={(e) => setRegEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={regPassword} onChange={(e) => setRegPassword(e.target.value)} placeholder="Password" />
        <button onClick={register}>Register</button>
      </section>

      <section>
        <h2>Login</h2>
        <input value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} placeholder="Password" />
        <button onClick={login}>Login</button>
      </section>

      <section>
        <h2>Session</h2>
        <button onClick={logout}>Logout</button>
        <button onClick={getMe}>Get /auth/me</button>
      </section>

      <section>
        <h2>Request Password Reset</h2>
        <input value={resetEmail} onChange={(e) => setResetEmail(e.target.value)} placeholder="Email" />
        <button onClick={requestPasswordReset}>Request Reset Link</button>
      </section>

      <section>
        <h2>Response</h2>
        <pre>{output}</pre>
      </section>
    </div>
  );
}
export default MainPage;