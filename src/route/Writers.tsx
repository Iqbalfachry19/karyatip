import React, { useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

function Writers() {
  const [activeTab] = useState<"writers" | "writing" | "tipWriters">("writers");
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
      {/* Topbar */}
      <Header />

      {/* Content Area */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        {activeTab === "writers" && (
          <>
            <section>
              <h2 className="text-2xl font-semibold mb-4">Popular Writers</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {writers.map((writer) => (
                  <div
                    key={writer.id}
                    className="bg-white rounded-xl p-5 shadow-sm hover:shadow-lg transition"
                  >
                    <h3 className="text-xl font-semibold text-orange-600">
                      {writer.name}
                    </h3>
                    <p className="text-gray-500 text-sm mb-2">
                      {writer.address}
                    </p>
                    <p className="text-gray-700 font-medium mt-3 mb-1">
                      Notable Works:
                    </p>
                    <ul className="list-disc list-inside text-sm text-gray-600 mb-4">
                      {writer.works.map((work, idx) => (
                        <li
                          className="cursor-pointer"
                          onClick={() =>
                            navigate(`/work/${encodeURIComponent(work)}`)
                          }
                          key={idx}
                        >
                          {work}
                        </li>
                      ))}
                    </ul>
                    <div className="space-x-2">
                      <button
                        onClick={() =>
                          navigate(
                            `/profile/${encodeURIComponent(writer.name)}`
                          )
                        }
                        className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
                      >
                        View Profile
                      </button>
                      <button
                        onClick={() => navigate(`/tipWriters`)}
                        className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
                      >
                        Tip
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default Writers;
