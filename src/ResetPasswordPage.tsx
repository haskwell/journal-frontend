import { useState } from "react";
import { useSearchParams } from "react-router-dom";

function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  //const api = "http://localhost:8787/api";
  const api = 'https://journal-backend.haskwell.workers.dev/api';
  const resetPassword = async () => {
    if (!token) {
      setMessage('Invalid or missing token.');
      return;
    }

    const res = await fetch(`${api}/password-reset`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, password: newPassword }),
    });

    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <div className="container">
      <h2>Reset Your Password</h2>
      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="New password"
      />
      <button onClick={resetPassword}>Reset Password</button>
      <p>{message}</p>
    </div>
  );
}

export default ResetPasswordPage;