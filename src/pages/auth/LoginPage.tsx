import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Login, RequestPasswordReset } from "../../services/authService";
function LoginPage(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const [resetEmail, setResetEmail] = useState("");


    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try{
            const res = await Login(username, password);
            if(res.success){
                navigate('/home')
            }
            else{
                setError("Login failed");
            }
        }
        catch (err){
            setError("Unexpected error")
        }
        finally{
            setLoading(false);
        }
    }

    async function requestPasswordReset(){
        await RequestPasswordReset(resetEmail)
    }

return (
  <div className="min-h-screen flex items-center justify-center bg-[#1c1b18] p-4">
    <div className="w-full max-w-md bg-[#2c2a26] shadow-lg rounded-lg p-8 space-y-6 text-gray-200">
      <h2 className="text-3xl font-serif font-bold text-center text-[#d9c8b8]">Login</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 border border-[#55524a] rounded-md bg-[#3a382f] text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#bfa276]"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-[#55524a] rounded-md bg-[#3a382f] text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#bfa276]"
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded-md font-serif font-semibold ${
            loading
              ? "bg-[#7a6850] cursor-not-allowed text-gray-300"
              : "bg-[#bfa276] hover:bg-[#d4b87d] text-[#1c1b18] transition"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        {error && <p className="text-red-400 text-sm">{error}</p>}
      </form>

      <div className="border-t border-[#55524a] pt-4 mt-4 space-y-2">
        <h3 className="text-[#d9c8b8] font-semibold">Forgot Password?</h3>
        <input
          type="text"
          value={resetEmail}
          onChange={(e) => setResetEmail(e.target.value)}
          placeholder="Email"
          className="w-full px-4 py-2 border border-[#55524a] rounded-md bg-[#3a382f] text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#bfa276]"
        />
        <button
          onClick={requestPasswordReset}
          className="w-full py-2 px-4 bg-[#7a6850] text-gray-200 rounded-md hover:bg-[#8c7760] transition"
        >
          Request Reset Link
        </button>
      </div>

      <p className="text-center text-gray-400 mt-4">
        Don&apos;t have an account?{" "}
        <span
          className="text-[#bfa276] hover:underline cursor-pointer"
          onClick={() => navigate("/register")}
        >
          Register here
        </span>
      </p>
    </div>
  </div>
);


}

export default LoginPage;