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
  <div className="min-h-screen flex flex-col items-center justify-center bg-[#1c1b18] p-6 font-serif text-[#d9c8b8]">
    <div className="w-full max-w-md bg-[#2c2a26] p-8 rounded-lg shadow-md border border-[#55524a] space-y-6">
      <h2 className="text-2xl font-bold text-center">Reset Your Password</h2>

      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="New password"
        className="w-full px-4 py-2 rounded-md border border-[#55524a] bg-[#1f1e1b] text-[#d9c8b8] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#bfa276]"
      />

      <button
        onClick={resetPassword}
        className="w-full py-2 px-4 bg-[#bfa276] text-[#1c1b18] font-semibold rounded-md hover:bg-[#d4b87d] transition"
      >
        Reset Password
      </button>

      {message && (
        <p className="text-center text-sm text-red-400">{message}</p>
      )}
    </div>
  </div>
);

}

export default ResetPasswordPage;