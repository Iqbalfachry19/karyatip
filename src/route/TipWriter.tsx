import { useEffect, useState } from "react";
import Header from "../components/Header";
import TipButton from "../components/TipButton";
import { useLocation } from "react-router-dom";
// import ZKProofForm from "../components/ZKProofForm";
// import ClaimButton from "../components/ClaimButton";

function TipWriter() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const addressFromQuery = params.get("address");
  const [writerAddress, setWriterAddress] = useState<string | null>(null);
  useEffect(() => {
    if (addressFromQuery) {
      setWriterAddress(addressFromQuery);
    }
  }, [addressFromQuery]);
  const [activeTab] = useState<"writers" | "writing" | "tipWriters">(
    "tipWriters"
  );
  return (
    <div className="min-h-screen min-w-screen bg-orange-50 text-gray-800 font-sans">
      {/* Topbar */}
      <Header />

      {/* Content Area */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        {activeTab === "tipWriters" && (
          <section className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold text-orange-600 mb-4">
              Support a Writer
            </h2>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Writer Wallet Address
              </label>
              <input
                type="text"
                placeholder="0x..."
                value={writerAddress || ""}
                className="w-full p-3 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                onChange={(e) => setWriterAddress(e.target.value)}
              />
            </div>

            {writerAddress && (
              <>
                <div className="mt-4">
                  <TipButton writerAddress={writerAddress} />
                </div>
                {/* <div className="mt-4">
                  <ZKProofForm writerAddress={writerAddress} />
                </div> */}
                {/* <div className="mt-4">
                  <ClaimButton writerAddress={writerAddress} />
                </div> */}
              </>
            )}
          </section>
        )}
      </main>
    </div>
  );
}

export default TipWriter;
