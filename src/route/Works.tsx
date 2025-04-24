import { useParams } from "react-router-dom";
import Header from "../components/Header";

const WorkPage = () => {
  const { title } = useParams();
  const decodedTitle = decodeURIComponent(title || "");

  return (
    <div className="min-h-screen min-w-screen bg-orange-50 text-gray-800 font-sans">
      {/* Topbar */}
      <Header />
      <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-md">
        {/* Main content */}
        <main className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-orange-600 mb-4">
            {decodedTitle}
          </h1>

          <p className="text-gray-700 text-lg leading-relaxed">
            This is the story content for <strong>{decodedTitle}</strong>.{" "}
            <br />
            You can later fetch and display the full story content, author info,
            comments, publication date, or even allow interactions like
            reactions or bookmarks.
          </p>
        </main>
      </div>
    </div>
  );
};

export default WorkPage;
