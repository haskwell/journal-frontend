import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { deletePage, getPagesByNumber, updatePage } from "../../services/pageService";
import type { UpdatePageRequest } from "../../types/page";
import { sharePage } from "../../services/sharingService";

function UpdateEntriesPage(){
    const {pageNumber} = useParams();

    const [content, setContent] = useState("");
    const [mood, setMood] = useState(5);
    const [title, setTitle] = useState("");
    const [color, setColor] = useState("#ffffff");
    const [error, setError] = useState<string | null>(null);
    const [shareError, setShareError] = useState<string | null>(null);
    const [updateError, setUpdateError] = useState<string | null>(null);

    const [loading, setLoading] = useState(true);

    const navigate = useNavigate()

    useEffect(() => {
        
        
        async function fetchEntry(){
            if(!pageNumber) return;
            try{
                const res = await getPagesByNumber(Number(pageNumber))
                if(!res.success){
                    setError(res.message)
                }
                setTitle(res.data.pageTitle)
                setColor(res.data.color)
                setContent(res.data.content)
                setMood(res.data.mood)
            }
            catch{
                setError("error")
            }
            finally{
                setLoading(false)
            }
        }
        fetchEntry();
    }, [pageNumber])

    async function handleUpdate(){
        const Update: UpdatePageRequest = {
            title: title,
            color: color,
            content: content,
            pageNumber: Number(pageNumber),
            mood: Number(mood)
        }
        const res = await updatePage(Update)
        if(!res.success){
            setUpdateError(res.message)
        }
        navigate(-1);
    }

if (loading)
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1c1b18] text-[#d9c8b8] font-serif text-xl">
      Loading entry...
    </div>
  );

if (error)
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1c1b18] text-red-400 font-serif text-xl">
      {error}
    </div>
  );



return (
  <div className="min-h-screen bg-[#1c1b18] p-6 flex flex-col items-center space-y-6 text-gray-200 font-serif">
    {/* Entry Editor */}
    <div
      className="w-full max-w-2xl p-6 rounded-lg shadow-md border border-[#55524a] space-y-4"
      style={{ backgroundColor: `${color}30` }}
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full px-4 py-2 rounded-md border border-[#55524a] bg-[#2c2a26] text-[#d9c8b8] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#bfa276]"
        placeholder="Title"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full px-4 py-2 rounded-md border border-[#55524a] bg-[#2c2a26] text-[#d9c8b8] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#bfa276]"
        placeholder="Content"
        rows={6}
      ></textarea>
      <div className="flex items-center gap-4">
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-16 h-10 rounded-md border border-[#55524a] cursor-pointer"
        />
        <select
          value={mood}
          onChange={(e) => setMood(Number(e.target.value))}
          className="px-3 py-2 rounded-md border border-[#55524a] bg-[#2c2a26] text-[#d9c8b8] focus:outline-none focus:ring-2 focus:ring-[#bfa276]"
        >
          {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
        <button
          onClick={() => handleUpdate()}
          className="ml-auto px-6 py-2 bg-[#bfa276] text-[#1c1b18] rounded-md font-semibold hover:bg-[#d4b87d] transition"
        >
          SAVE
        </button>
      </div>
      {updateError && (
        <p className="mt-2 text-red-400 font-serif text-sm">
            {updateError}
        </p>
        )}
    </div>

    {/* Share Section */}
    <div className="w-full max-w-2xl flex gap-2">
      <input
        type="text"
        id="shareUsername"
        placeholder="Username"
        className="flex-1 px-4 py-2 rounded-md border border-[#55524a] bg-[#2c2a26] text-[#d9c8b8] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#bfa276]"
      />
      <button
        onClick={async () => {
          const input = document.getElementById("shareUsername") as HTMLInputElement;
          const res = await sharePage(Number(pageNumber), input.value);
          if(!res.success){
            setShareError(res.message)
          }
        }}
        className="px-4 py-2 bg-[#7a6850] text-gray-200 rounded-md hover:bg-[#8c7760] transition"
      >
        SHARE
      </button>
    </div>
    {shareError && (
    <p className="mt-2 text-red-400 font-serif text-sm">
        {shareError}
    </p>
    )}

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
          deletePage(Number(pageNumber));
          navigate("/entries", {replace: true});
        }}
        className="px-6 py-2 bg-[#a35a4f] text-gray-200 rounded-md hover:bg-[#b06b5c] transition"
      >
        DELETE
      </button>
    </div>
  </div>
);

}

export default UpdateEntriesPage