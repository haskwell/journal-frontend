import { useEffect, useState } from "react"
import type { Page } from "../../types/page"
import { getSharedPages, getSharedPagesISent } from "../../services/sharingService";
import { useNavigate } from "react-router-dom";

function SharingPage(){
    
    const [sharedEntries, setSharedEntries] = useState<Page[]>([])
    const [sharedEntriesMe, setSharedEntriesMe] = useState<Page[]>([])
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
        
    useEffect(() => {
        async function fetchAll() {
            try {
                const [resSharedWithMe, resSharedByMe] = await Promise.all([
                    getSharedPages(0, 20),
                    getSharedPagesISent(0, 20)
                ]);
                setSharedEntries(resSharedWithMe.data);
                setSharedEntriesMe(resSharedByMe.data);
            } catch(err) {
            setError("error");
            } finally {
            setLoading(false);
            }
        }
        fetchAll();
    }, []);
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

return (
  <div className="min-h-screen bg-[#1c1b18] p-6 font-serif text-[#d9c8b8] space-y-8">
          <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-[#7a6850] text-[#f5f0e6] rounded-md font-serif font-semibold hover:bg-[#8c7760] transition"
      >
        ← Back
      </button>
    {/* Shared Entries */}
    <div>
      <h2 className="text-2xl font-bold mb-4">Shared Entries</h2>
      {sharedEntries.length === 0 ? (
        <p className="text-gray-400">No entries</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {sharedEntries.map((entry) => (
            <div
              key={entry.pageId}
              className="p-6 rounded-lg shadow-md border border-[#55524a] hover:shadow-lg transition"
              style={{ backgroundColor: `${entry.color}30` || "#2c2a26" }}
            >
              <h2 className="text-xl font-bold text-[#d9c8b8] mb-2">{entry.pageTitle}</h2>
              <p className="mb-2">{entry.content}</p>
              <p className="mb-2">Mood: {entry.mood}</p>
              <button
                onClick={() => navigate(`/entries/shared/${entry.pageId}`)}
                className="mt-2 px-4 py-2 bg-[#7a6850] text-[#f5f0e6] rounded-md hover:bg-[#8c7760] transition"
              >
                Navigate
              </button>
            </div>
          ))}
        </div>
      )}
    </div>

    {/* Section */}
    <div>
      <h2 className="text-2xl font-bold mb-4">Your Shared Entries</h2>
      {sharedEntriesMe.length === 0 ? (
        <p className="text-gray-400">No entries</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {sharedEntriesMe.map((entry) => (
            <div
              key={entry.pageId}
              className="p-6 rounded-lg shadow-md border border-[#55524a] hover:shadow-lg transition"
              style={{ backgroundColor: `${entry.color}30` || "#2c2a26" }}
            >
              <h2 className="text-xl font-bold text-[#d9c8b8] mb-2">{entry.pageTitle}</h2>
              <p className="mb-2">{entry.content}</p>
              <p className="mb-2">Mood: {entry.mood}</p>
              <button
                onClick={() => navigate(`/entries/update/${entry.pageNumber}`)}
                className="mt-2 px-4 py-2 bg-[#bfa276] text-[#1c1b18] rounded-md hover:bg-[#d4b87d] transition"
              >
                Navigate
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);


}

export default SharingPage;