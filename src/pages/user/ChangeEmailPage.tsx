import { useState } from "react";
import { UpdateUsername } from "../../services/authService";
import { useNavigate } from "react-router-dom";

function ChangeEmailPage(){
    const [newEmail, setNewEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);
        setLoading(true);
        try {
            const res = await UpdateUsername(newEmail, password);
            if(res.success){
                setMessage("Username updated");
                await new Promise((resolve) => setTimeout(resolve, 5000)); // optional 5s wait
                navigate('/home');
            }
        } catch(err){
            setMessage("error");
        } finally {
            setLoading(false);
        }
    }
return (
<div className="min-h-screen flex flex-col items-center justify-center bg-[#1c1b18] p-6 font-serif text-[#d9c8b8]">
  <div className="w-full max-w-md bg-[#2c2a26] p-8 rounded-lg shadow-md border border-[#55524a] space-y-6">
    <h2 className="text-2xl font-bold text-center">Update Email</h2>
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="New email"
        value={newEmail}
        onChange={(e) => setNewEmail(e.target.value)}
        className="w-full px-4 py-2 rounded-md border border-[#55524a] bg-[#1f1e1b] text-[#d9c8b8] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#bfa276]"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-4 py-2 rounded-md border border-[#55524a] bg-[#1f1e1b] text-[#d9c8b8] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#bfa276]"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 px-4 bg-[#bfa276] text-[#1c1b18] rounded-md font-semibold hover:bg-[#d4b87d] transition"
      >
        {loading ? "Updating email..." : "Update email"}
      </button>
      {message && <p className="text-red-400 text-center mt-2">{message}</p>}
    </form>
              <button
  onClick={() => navigate(-1)}
  className="mb-4 px-4 py-2 bg-[#7a6850] text-[#f5f0e6] rounded-md font-serif font-semibold hover:bg-[#8c7760] transition"
>
  ← Back
</button>
  </div>
</div>
)

}

export default ChangeEmailPage;
