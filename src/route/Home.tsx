import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import HeroImage from "../assets/karyatip.png"; // adjust the path as needed
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
  console.log(allWorks);

  return (
    <div className="min-h-screen min-w-screen bg-orange-50 text-gray-800 font-sans">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-10">
        {/* Hero Section */}
        <section className="relative h-60 md:h-[330px] mb-16 rounded-xl overflow-hidden">
          {/* Background Image */}
          <img
            src={HeroImage}
            alt="Hero for KaryaTip"
            className="absolute inset-0 w-full h-full object-cover z-0"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-orange-50 via-orange-50/70 to-transparent z-10" />

          {/* Text Overlay */}
          <div className="absolute inset-0 z-20 flex flex-col items-center pt-20 justify-center text-center px-4">
            <h2
              className="text-3xl md:text-4xl font-bold text-orange-600 mb-4"
              style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.4)" }}
            >
              Write. Share. Inspire.
            </h2>
            <p
              className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto mb-6"
              style={{ textShadow: "1px 1px 3px rgba(0,0,0,0.3)" }}
            >
              Discover and support amazing writers. Share your story with the
              world and earn tips from your readers.
            </p>
            <button
              onClick={() => navigate("/writing")}
              className="px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition"
            >
              Start Writing
            </button>
          </div>
        </section>

        {/* Popular Stories */}
        <section className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Stories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {allWorks && allWorks.length > 0 ? (
              allWorks.map((work: Work, idx: number) => (
                <div
                  key={`${idx}`}
                  className="bg-white p-4 rounded-xl shadow hover:shadow-md transition"
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {work.title} {/* title */}
                  </h3>

                  <div className="space-x-2">
                    <button
                      onClick={() =>
                        navigate(
                          `/work/${encodeURIComponent(work.id.toString())}`
                        )
                      }
                      className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
                    >
                      Read Story
                    </button>
                    <button
                      onClick={() => navigate(`/tipWriters`)}
                      className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
                    >
                      Tip
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No stories available.</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
