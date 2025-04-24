import React, { useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import HeroImage from "../assets/karyatip.png"; // adjust the path as needed

const Home = () => {
  const [activeTab, setActiveTab] = useState<
    "writers" | "writing" | "tipWriters"
  >("writers");
  const navigate = useNavigate();
  const writers = [
    {
      id: 1,
      name: "Alicia Moon",
      address: "0x1234...",
      works: ["The Moonlight Sonata", "Reflections in Orbit", "Crater Dreams"],
    },
    {
      id: 2,
      name: "Jonas Write",
      address: "0x5678...",
      works: ["Fragments of Time", "The Writer's Journey", "Chronicles of Ink"],
    },
    {
      id: 3,
      name: "Luna Verse",
      address: "0x9abc...",
      works: ["Stars & Stories", "Orbiting Imagination"],
    },
  ];

  return (
    <div className="min-h-screen min-w-screen bg-orange-50 text-gray-800 font-sans">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

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
          <h2 className="text-2xl font-semibold mb-4">Popular Stories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {writers.flatMap((writer) =>
              writer.works.map((work, idx) => (
                <div
                  key={`${writer.id}-${idx}`}
                  className="bg-white p-4 rounded-xl shadow hover:shadow-md transition"
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {work}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">
                    By{" "}
                    <span
                      className="cursor-pointer hover:text-orange-500"
                      onClick={() => navigate(`profile/${writer.name}`)}
                    >
                      {writer.name}
                    </span>
                  </p>
                  <div className="space-x-2">
                    <button
                      onClick={() =>
                        navigate(`/work/${encodeURIComponent(work)}`)
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
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
