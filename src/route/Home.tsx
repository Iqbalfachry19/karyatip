import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import HeroImage from "../assets/karyatip.png";
import { useReadContract } from "wagmi";
import { KARYATIP_ADDRESS } from "../constants";
import { karyatipABI } from "../utils/abi";

type Work = {
  id: bigint;
  title: string;
  content: string;
  totalTips: bigint;
};

const Home = () => {
  const navigate = useNavigate();
  const { data: allWorks } = useReadContract({
    address: KARYATIP_ADDRESS,
    abi: karyatipABI,
    functionName: "getAllWorks",
  });

  return (
    <div className="min-h-screen min-w-screen bg-orange-50 text-gray-800 font-sans">
      <Header />

      <main className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-10">
        {/* Hero Section */}
        <section className="relative h-60 sm:h-72 md:h-[330px] mb-10 rounded-xl overflow-hidden">
          <img
            src={HeroImage}
            alt="Hero for KaryaTip"
            className="absolute inset-0 w-full h-full object-cover z-0"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-orange-50 via-orange-50/70 to-transparent z-10" />

          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-orange-600 mb-3"
              style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.4)" }}
            >
              Write. Share. Inspire.
            </h2>
            <p
              className="text-sm sm:text-base md:text-lg text-gray-700 max-w-md sm:max-w-xl mx-auto mb-4 sm:mb-6"
              style={{ textShadow: "1px 1px 3px rgba(0,0,0,0.3)" }}
            >
              Discover and support amazing writers. Share your story with the
              world and earn tips from your readers.
            </p>
            <button
              onClick={() => navigate("/writing")}
              className="px-5 py-2.5 sm:px-6 sm:py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition"
            >
              Start Writing
            </button>
          </div>
        </section>

        {/* Stories Section */}
        <section className="mt-6 sm:mt-10">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">Stories</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {allWorks && allWorks.length > 0 ? (
              allWorks.map((work: Work, idx: number) => (
                <div
                  key={idx}
                  className="bg-white p-4 rounded-xl shadow hover:shadow-md transition"
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
                    {work.title}
                  </h3>
                  <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
                    <button
                      onClick={() =>
                        navigate(
                          `/work/${encodeURIComponent(work.id.toString())}`
                        )
                      }
                      className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 text-sm"
                    >
                      Read Story
                    </button>
                    <button
                      onClick={() => navigate(`/tipWriters`)}
                      className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 text-sm"
                    >
                      Tip
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center sm:text-left">
                No stories available.
              </p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
