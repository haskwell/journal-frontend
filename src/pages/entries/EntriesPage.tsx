import { useEffect, useState } from "react";
import { getPages, newPage } from "../../services/pageService";
import type { Page } from "../../types/page";
import { useLocation, useNavigate } from "react-router-dom";

function EntriesPage(){

    const [entries, setEntries] = useState<Page[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchEntries(){
            try{
                const res = await getPages(0, 20)
                setEntries(res.data)
            }
            catch(err){
                setError("error")
            }
            finally{
                setLoading(false)
            }
        }
        fetchEntries();
    }, [])

    async function addEntry(){
        const res = await newPage()
        setEntries((prev) => [res.data, ...prev])
        return res.data;
    }

    const navigate = useNavigate()

    function updateEntry(pageNumber: number){
        navigate(`/entries/update/${pageNumber}`)
    }

if (loading)
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1c1b18] text-[#d9c8b8] font-serif text-xl">
      Loading entries...
    </div>
  );

if (error)
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1c1b18] text-red-400 font-serif text-xl">
      {error}
    </div>
  );


return (
  <div className="min-h-screen bg-[#1c1b18] p-6">
    {/* Add Entry Button */}
    <div className="flex justify-center mb-6">
      <button
        onClick={() => addEntry()}
        className="px-6 py-3 bg-[#bfa276] text-[#1c1b18] font-serif font-semibold rounded-md hover:bg-[#d4b87d] transition"
      >
        ADD NEW ENTRY
      </button>
    </div>
          <button
  onClick={() => navigate(-1)}
  className="mb-4 px-4 py-2 bg-[#7a6850] text-[#f5f0e6] rounded-md font-serif font-semibold hover:bg-[#8c7760] transition"
>
  ← Back
</button>
    {/* Entries List */}
    {entries.length === 0 ? (
      <p className="text-center text-gray-400">No entries</p>
    ) : (
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {entries.map((entry) => (
          <div
            key={entry.pageId}
            className="bg-[#2c2a26] text-gray-200 p-6 rounded-lg shadow-md border border-[#55524a] hover:shadow-lg transition"
            style={{ backgroundColor: `${entry.color}30` || "#2c2a26" }}
          >
            <h2 className="text-xl font-serif font-bold text-[#d9c8b8] mb-2">
              {entry.pageTitle}
            </h2>
            <p className="mb-2">{entry.content}</p>
            <p className="mb-2">Mood: {entry.mood}</p>
            <h3 className="font-semibold">Page #: {entry.pageNumber}</h3>
            <button
              onClick={() => updateEntry(entry.pageNumber)}
              className="mt-4 w-full py-2 px-4 bg-[#7a6850] text-gray-200 rounded-md font-serif hover:bg-[#8c7760] transition"
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    )}
  </div>
);


}

export default EntriesPage;