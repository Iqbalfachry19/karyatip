import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";

const writerData = [
  {
    id: 1,
    name: "Alicia Moon",
    address: "0x1234...",
    bio: "Alicia is a lunar poet who draws inspiration from celestial events.",
    works: ["The Moonlight Sonata", "Reflections in Orbit", "Crater Dreams"],
  },
  {
    id: 2,
    name: "Jonas Write",
    address: "0x5678...",
    bio: "Jonas is a digital nomad, telling stories of timeless journeys.",
    works: ["Fragments of Time", "The Writer's Journey", "Chronicles of Ink"],
  },
  {
    id: 3,
    name: "Luna Verse",
    address: "0x9abc...",
    bio: "Luna writes sci-fi and fantasy with a cosmic twist.",
    works: ["Stars & Stories", "Orbiting Imagination"],
  },
];

const ProfilePage = () => {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();

  const writer = writerData.find((w) => w.name.toString() === name);

  if (!writer) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl text-orange-600 font-semibold">
          Writer Not Found
        </h2>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen min-w-screen bg-orange-50 text-gray-800 font-sans">
      <Header />

      <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-orange-600 mb-2">
          {writer.name}
        </h1>
        <p className="text-gray-500 mb-4">{writer.address}</p>
        <p className="text-gray-700 italic mb-6">{writer.bio}</p>

        <h2 className="text-xl font-semibold text-orange-500 mb-3">
          Published Works
        </h2>
        <ul className="list-disc list-inside text-gray-700 mb-6">
          {writer.works.map((work, idx) => (
            <li
              className="cursor-pointer"
              onClick={() => navigate(`/work/${encodeURIComponent(work)}`)}
              key={idx}
            >
              {work}
            </li>
          ))}
        </ul>

        <button
          onClick={() => navigate("/")}
          className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
