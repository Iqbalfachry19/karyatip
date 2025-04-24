import { useState } from "react";
import Header from "../components/Header";
import RichTextEditor from "../components/RichTextEditor";

function Writing() {
  const [activeTab] = useState<"writers" | "writing" | "tipWriters">("writing");
  return (
    <div className="min-h-screen min-w-screen bg-orange-50 text-gray-800 font-sans">
      {/* Topbar */}
      <Header />

      {/* Content Area */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        {activeTab === "writing" && (
          <section className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold text-orange-600 mb-4">
              Start Writing
            </h2>

            {/* Form untuk Judul */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Story Title
              </label>
              <input
                type="text"
                placeholder="Enter story title"
                className="w-full p-3 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            {/* Rich Text Editor */}
            <RichTextEditor />
          </section>
        )}
      </main>
    </div>
  );
}

export default Writing;
