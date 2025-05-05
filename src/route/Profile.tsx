import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useReadContract } from "wagmi";
import { KARYATIP_ADDRESS } from "../constants";
import { karyatipABI } from "../utils/abi";
import { formatUnits } from "viem/utils";
type Work = {
  id: bigint;
  title: string;
  content: string;
  totalTips: bigint;
};
const ProfilePage = () => {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();

  const { data: authorData, isLoading: loadingAuthor } = useReadContract({
    address: KARYATIP_ADDRESS,
    abi: karyatipABI,
    functionName: "getAuthor",
    args: [name?.toString() ?? ""],
  });

  if (loadingAuthor) {
    return (
      <div className="min-h-screen min-w-screen flex items-center justify-center bg-orange-50">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-orange-500 border-dashed rounded-full animate-spin mx-auto mb-4" />
          <p className="text-orange-600 text-lg font-medium">
            Loading writer profile...
          </p>
          <p className="text-gray-500 text-sm">
            Please wait while we fetch the data.
          </p>
        </div>
      </div>
    );
  }

  if (!authorData) {
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

  // Destructure author data
  const [address, username, bio, tipCount, works] = authorData;
  const formattedAmount = formatUnits(tipCount ?? BigInt(0), 2); // IDRX has 2 decimals

  return (
    <div className="min-h-screen min-w-screen bg-orange-50 text-gray-800 font-sans">
      <Header />

      <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-orange-600 mb-2">{username}</h1>
        <p className="text-gray-500 mb-1">{bio}</p>
        <p className="text-gray-500 mb-4">{address}</p>
        <p className="text-gray-700 italic mb-6">
          Tipped {formattedAmount.toString()} IDRX
        </p>

        <h2 className="text-xl font-semibold text-orange-500 mb-3">
          Published Works
        </h2>
        <ul className="list-disc list-inside text-gray-700 mb-6">
          {works.length === 0 ? (
            <li>No works available</li>
          ) : (
            works.map((work: Work, idx: number) => (
              <li
                key={idx}
                className="cursor-pointer hover:underline"
                onClick={() =>
                  navigate(`/work/${encodeURIComponent(work.id.toString())}`)
                }
              >
                {work.title}
              </li>
            ))
          )}
        </ul>

        <div className="space-x-2">
          <button
            onClick={() => navigate("/writers")}
            className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
          >
            Back
          </button>
          <button
            onClick={() => navigate(`/tipWriters?address=${address}`)}
            className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
          >
            Tip
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
