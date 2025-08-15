import { Outlet, Navigate } from "react-router-dom";
import { IsLoggedIn } from "../services/authService";
import { useEffect, useState } from "react";


const AuthGuard = () => {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      const res = await IsLoggedIn();
      setLoggedIn(res);
      setLoading(false);
    }
    checkLogin()
  }, [])
if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1c1b18] text-[#d9c8b8] font-serif text-xl">
      Loading...
    </div>
  );
}

  if(!loggedIn){
    return <Navigate to="/login"/>
  }
  return <Outlet />
};

export default AuthGuard;
