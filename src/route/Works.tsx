import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";

const WorkPage = () => {
  const { title } = useParams();
  const decodedTitle = decodeURIComponent(title || "");
  const navigate = useNavigate();

  const authorName = "Alicia Moon";
  const authorAddress = "0xAbcd...1234"; // Replace with actual shortened address

  return (
    <div className="min-h-screen min-w-screen bg-orange-50 text-gray-800 font-sans">
      {/* Topbar */}
      <Header />

      <section className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-2xl shadow-lg">
        {/* Title & Author */}
        <div className="space-y-1 mb-6">
          <h1 className="text-4xl font-extrabold text-orange-600">
            {decodedTitle}
          </h1>
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <div className="w-8 h-8 rounded-full bg-orange-200 flex items-center justify-center font-bold text-orange-600">
              {authorName.charAt(0)}
            </div>
            <div>
              <div className="font-medium">{authorName}</div>
              <div className="text-xs">{authorAddress}</div>
            </div>
          </div>
        </div>

        {/* Content */}
        <p className="text-gray-700 text-lg leading-relaxed mb-8">
          This is the story content for <strong>{decodedTitle}</strong>. <br />
          You can later fetch and display the full story content, author info,
          comments, publication date, or even allow interactions like reactions
          or bookmarks.
        </p>

        {/* Tip Button */}
        <button
          onClick={() => navigate(`/tipWriters`)}
          className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition"
        >
          💸 Tip the Author
        </button>
      </section>
    </div>
  );
};

export default WorkPage;
