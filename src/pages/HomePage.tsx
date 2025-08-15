import { useNavigate } from "react-router-dom";
import { newPage } from "../services/pageService";

function HomePage() {
  //const api = "http://localhost:8787/api";
  const api = "https://journal-backend.haskwell.workers.dev/api";
    const navigate = useNavigate()

  const logout = async () => {
        await fetch(`${api}/logout`, {
            method: "POST",
            credentials: "include",
        });
        navigate('/login');
  };

  const getMe = async () => {
        fetch(`${api}/auth/me`, {
            method: "GET",
            credentials: "include",
        });
  };

return (
  <div className="min-h-screen flex flex-col items-center justify-center bg-[#1c1b18] p-6 space-y-8">
    <h1 className="text-5xl font-serif font-bold text-[#d9c8b8]">SPERO</h1>

    <div className="flex flex-col sm:flex-row gap-4 flex-wrap justify-center">
      <button
        onClick={() => navigate('/entries')}
        className="px-6 py-3 bg-[#7a6850] text-[#f5f0e6] rounded-md font-serif font-semibold hover:bg-[#8c7760] transition"
      >
        Pages List
      </button>

      <button
        onClick={() => navigate('/entries/shared')}
        className="px-6 py-3 bg-[#6b705c] text-[#f5f0e6] rounded-md font-serif font-semibold hover:bg-[#7c7a6d] transition"
      >
        Shared Pages List
      </button>

      <button
        onClick={async () => {
          const res = await newPage();
          navigate(`/entries/update/${res.data.pageNumber}`);
        }}
        className="px-6 py-3 bg-[#bfa276] text-[#1c1b18] rounded-md font-serif font-semibold hover:bg-[#d4b87d] transition"
      >
        Add New Page
      </button>

      <button
        onClick={() => getMe()}
        className="px-6 py-3 bg-[#8c7960] text-[#f5f0e6] rounded-md font-serif font-semibold hover:bg-[#9d8a71] transition"
      >
        Get User Info
      </button>

      <button
        onClick={() => navigate('/options')}
        className="px-6 py-3 bg-[#9b7150] text-[#f5f0e6] rounded-md font-serif font-semibold hover:bg-[#ac8461] transition"
      >
        User Settings
      </button>
      <button
        onClick={() => logout()}
        className="px-6 py-3 bg-[#a35a4f] text-[#f5f0e6] rounded-md font-serif font-semibold hover:bg-[#b06b5c] transition"
      >
        Logout
      </button>

    </div>
  </div>
);


}

export default HomePage;
