import { useNavigate, useParams } from "react-router-dom";
import { deleteShare, getSharedPageById } from "../../services/sharingService";
import type { Page } from "../../types/page";
import { useEffect, useState } from "react";

function ViewSharedPage(){

    const { pageId } = useParams();
    const [page, setPage] = useState<Page | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if(!pageId){
            setError("no page id")
            setLoading(false)
            return;
        }

        async function fetchPage(){
            try{
                const res : Page = await getSharedPageById(pageId);
                setPage(res)
            }
            catch{
                setError("error")
            }
            finally{
                setLoading(false)
            }
        }

        fetchPage()
    }, [pageId])

    const navigate = useNavigate()
if (loading)
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1c1b18] text-[#d9c8b8] font-serif text-xl">
      Loading...
    </div>
  );

if (error)
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1c1b18] text-red-400 font-serif text-xl">
      {error}
    </div>
  );

if (!page)
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1c1b18] text-gray-400 font-serif text-xl">
      Page not found
    </div>
  );

return (
  <div className="min-h-screen bg-[#1c1b18] p-6 font-serif text-[#d9c8b8] space-y-6 flex flex-col items-center">
    {/* Page Display */}
    <div
      className="w-full max-w-2xl p-6 rounded-lg shadow-md border border-[#55524a] space-y-4"
      style={{ backgroundColor: `${page.color}30` }}
    >
      <h2 className="text-2xl font-bold mb-2">{page.pageTitle}</h2>
      <p className="mb-2">{page.content}</p>
      <p className="text-gray-400">Mood: {page.mood}</p>
    </div>

    {/* Delete Button */}
    <div className="w-full max-w-2xl flex justify-between">
              <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-[#7a6850] text-[#f5f0e6] rounded-md font-serif font-semibold hover:bg-[#8c7760] transition"
      >
        ← Back
      </button>
      <button
        onClick={() => {
          deleteShare(page.pageId);
          navigate("/entries/shared", { replace: true });
        }}
        className="px-6 py-2 bg-[#a35a4f] text-[#f5f0e6] rounded-md hover:bg-[#b06b5c] transition"
      >
        DELETE
      </button>
    </div>
  </div>
);

}

export default ViewSharedPage;