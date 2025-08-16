import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { Register } from "../../services/authService";

function RegisterPage(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try{
            const res = await Register(username, email, password);
            if(res.success){
                navigate('/login')
            }
            else{
                setError(res.message)
            }
        }
        catch(err){
            setError("Registration failed")
        }
        finally{
            setLoading(false);
        }
    }
return (
  <div className="min-h-screen flex items-center justify-center bg-[#1c1b18] p-4">
    <div className="w-full max-w-md bg-[#2c2a26] shadow-lg rounded-lg p-8 space-y-6 text-gray-200">
      <h2 className="text-3xl font-serif font-bold text-center text-[#d9c8b8]">Register</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 border border-[#55524a] rounded-md bg-[#3a382f] text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#bfa276]"
        />
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          {loading ? "Registering..." : "Register"}
        </button>
        {error && <p className="text-red-400 text-sm">{error}</p>}
      </form>

      <p className="text-center text-gray-400">
        Already have an account?{" "}
        <span
          className="text-[#bfa276] hover:underline cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Log in here
        </span>
      </p>
    </div>
  </div>
);



}

export default RegisterPage;