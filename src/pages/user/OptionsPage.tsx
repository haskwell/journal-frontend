import { Link, useNavigate } from "react-router-dom";

function OptionsPage() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#1c1b18] p-6 font-serif text-[#d9c8b8] space-y-6">
      <h1 className="text-3xl font-bold mb-4">User Settings</h1>

      <div className="flex flex-col space-y-4">
        <Link
          to="/options/email"
          className="px-6 py-3 bg-[#7a6850] text-[#f5f0e6] rounded-md font-semibold hover:bg-[#8c7760] transition text-center"
        >
          Change Email
        </Link>

        <Link
          to="/options/username"
          className="px-6 py-3 bg-[#6b705c] text-[#f5f0e6] rounded-md font-semibold hover:bg-[#7c7a6d] transition text-center"
        >
          Change Username
        </Link>

        <Link
          to="/options/password"
          className="px-6 py-3 bg-[#a35a4f] text-[#f5f0e6] rounded-md font-semibold hover:bg-[#b06b5c] transition text-center"
        >
          Change Password
        </Link>
      </div>
                <button
  onClick={() => navigate(-1)}
  className="mb-4 px-4 py-2 bg-[#7a6850] text-[#f5f0e6] rounded-md font-serif font-semibold hover:bg-[#8c7760] transition"
>
  ← Back
</button>
    </div>
  );
}

export default OptionsPage;
