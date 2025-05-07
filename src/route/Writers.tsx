import { useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { karyatipABI } from "../utils/abi";
import { KARYATIP_ADDRESS } from "../constants";
import { useReadContract } from "wagmi";
type Work = {
  id: bigint;
  title: string;
  content: string;
  totalTips: bigint;
};

type Writer = {
  id: number;
  address: string;
  name: string;
  bio: string;
  tips: bigint;
  works: Work[];
};

function Writers() {
  const [activeTab] = useState<"writers" | "writing" | "tipWriters">("writers");
  const navigate = useNavigate();

  const { data: rawData, isLoading: isLoadingAuthors } = useReadContract({
    address: KARYATIP_ADDRESS,
    abi: karyatipABI,
    functionName: "getAllAuthorsBasicInfo",
  });

  const { data: rawWorks, isLoading: isLoadingWorks } = useReadContract({
    address: KARYATIP_ADDRESS,
    abi: karyatipABI,
    functionName: "getAllAuthorsWorks",
  });

  const isLoading = isLoadingAuthors || isLoadingWorks;

  const writers: Writer[] =
    rawData && rawWorks
      ? rawData[0].map((_: unknown, i: number): Writer => {
          const address = rawData[0][i];
          const matchedWorks: Work[] = [];

          rawWorks[1].forEach((addr: string, idx: number) => {
            if (addr.toLowerCase() === address.toLowerCase()) {
              const work = rawWorks[0][idx] as Work;
              matchedWorks.push(work);
            }
          });

          return {
            id: i,
            address,
            name: rawData[1][i],
            bio: rawData[2][i],
            tips: rawData[3][i],
            works: matchedWorks,
          };
        })
      : [];
  if (isLoading) {
    return (
      <div className="min-h-screen min-w-screen bg-orange-50 text-gray-800 font-sans">
        <Header />
        <main className="max-w-4xl mx-auto px-4 py-12 flex flex-col items-center justify-center text-center">
          <div className="w-10 h-10 border-4 border-orange-500 border-dashed rounded-full animate-spin mb-4" />
          <h2 className="text-lg font-semibold text-orange-600 mb-1">
            Loading Writers...
          </h2>
          <p className="text-sm text-gray-500">
            Please wait while we fetch all creative minds.
          </p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen min-w-screen bg-orange-50 text-gray-800 font-sans">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-6">
        {activeTab === "writers" && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">Writers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {writers.map((writer) => (
                <div
                  key={writer.id}
                  className="bg-white rounded-xl p-5 shadow-sm hover:shadow-lg transition"
                >
                  <h3 className="text-xl font-semibold text-orange-600">
                    {writer.name}
                  </h3>
                  <p
                    className="text-gray-500 text-sm mb-2 truncate w-full"
                    title={writer.address}
                  >
                    {writer.address}
                  </p>
                  <p className="text-sm text-gray-700 italic mb-1">
                    {writer.bio}
                  </p>
                  <p className="text-gray-700 font-medium mt-3 mb-1">
                    Notable Works:
                  </p>
                  <ul className="list-disc list-inside text-sm text-gray-600 mb-4">
                    {writer.works.length === 0 ? (
                      <li>No works available</li>
                    ) : (
                      writer.works.map((work: Work, idx: number) => (
                        <li
                          key={idx}
                          className="cursor-pointer hover:underline"
                          onClick={() =>
                            navigate(
                              `/work/${encodeURIComponent(work.id.toString())}`
                            )
                          }
                        >
                          {work.title}
                        </li>
                      ))
                    )}
                  </ul>

                  <div className="space-x-2">
                    <button
                      onClick={() =>
                        navigate(
                          `/profile/${encodeURIComponent(writer.address)}`
                        )
                      }
                      className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
                    >
                      View Profile
                    </button>
                    <button
                      onClick={() =>
                        navigate(`/tipWriters?address=${writer.address}`)
                      }
                      className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
                    >
                      Tip
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default Writers;
