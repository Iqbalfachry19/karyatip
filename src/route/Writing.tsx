import { useEffect, useState } from "react";
import Header from "../components/Header";
import RichTextEditor from "../components/RichTextEditor";
import { UltraHonkBackend } from "@aztec/bb.js";
import { CompiledCircuit, Noir } from "@noir-lang/noir_js";
import zk from "../assets/zk.json";
import { karyatipABI } from "../utils/abi";
import { KARYATIP_ADDRESS } from "../constants";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { Address } from "viem";
import { ConnectButton } from "@xellar/kit";
import { ConnectedButton } from "../components/ConnectedButton";
import { useNavigate } from "react-router-dom";
import KtpOcr from "../components/ocr";

function Writing() {
  const navigate = useNavigate();
  const [activeTab] = useState<"writers" | "writing" | "tipWriters">("writing");
  const [isProofValid, setIsProofValid] = useState(false);

  const [isRegistered, setIsRegistered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [authorName, setAuthorName] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const { writeContractAsync } = useWriteContract();
  const [storyTitle, setStoryTitle] = useState("");
  const [bio, setBio] = useState("");

  const register = async () => {
    if (!address || !authorName.trim()) return;

    try {
      setIsRegistering(true);
      await writeContractAsync({
        address: KARYATIP_ADDRESS,
        abi: karyatipABI,
        functionName: "registerAuthor",
        args: [authorName.trim(), bio.trim()],
      });

      setIsRegistered(true);
      setShowModal(false);
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setIsRegistering(false);
    }
  };

  const { address } = useAccount();

  const { data, isSuccess } = useReadContract({
    address: KARYATIP_ADDRESS,
    abi: karyatipABI,
    functionName: "authors",
    args: [address as Address],
    query: { enabled: !!address },
  });
  useEffect(() => {
    if (data?.[4] === true) {
      setShowModal(false);
    }
  }, [data]);
  useEffect(() => {
    if (data?.[4] === false) {
      setShowModal(true);
    }
  }, [data]);

  useEffect(() => {
    if (!address || (isSuccess && data && data[0] === "")) {
      setShowModal(true);
    } else {
      setIsRegistered(true);
    }
  }, [address, data, isSuccess]);

  return (
    <div className="min-h-screen min-w-screen bg-orange-50 text-gray-800 font-sans relative">
      <Header />

      {showModal && (
        <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white mx-2 p-6 rounded-xl shadow-lg max-w-md w-full text-center space-y-4 border border-orange-200">
            {/* Modal for Wallet Not Connected */}
            {!address ? (
              <>
                <h2 className="text-xl font-semibold text-orange-600">
                  Connect Your Wallet
                </h2>
                <p className="text-gray-600">
                  To start writing, please connect your wallet.
                </p>
                <ConnectButton.Custom>
                  {({
                    openConnectModal,
                    account,
                    isConnected,
                    openProfileModal,
                  }) => {
                    if (!isConnected) {
                      return (
                        <button
                          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm"
                          onClick={openConnectModal}
                        >
                          Connect Wallet
                        </button>
                      );
                    }
                    return (
                      <ConnectedButton
                        address={account?.address as Address}
                        onClick={openProfileModal}
                      />
                    );
                  }}
                </ConnectButton.Custom>
              </>
            ) : (
              <>
                {data?.[4] === false && (
                  <>
                    <h2 className="text-xl font-semibold text-orange-600">
                      Access Restricted
                    </h2>
                    <p className="text-gray-600">
                      You are not registered as an author.
                    </p>
                    <div className="flex flex-col justify-center gap-4 mt-4">
                      <input
                        type="text"
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                        placeholder="Enter your author name"
                        className="w-full px-3 py-2 border border-orange-300 rounded-md"
                      />
                      <textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="Enter your bio"
                        rows={3}
                        className="w-full px-3 py-2 border border-orange-300 rounded-md"
                      />
                      <KtpOcr
                        onExtractBirthdate={async (dob) => {
                          const year = dob
                            ?.split("-")
                            .find((part) => part.length === 4);

                          if (!year) {
                            console.error("Year not found in date of birth.");
                            setIsProofValid(false);
                            return;
                          }

                          try {
                            const noir = new Noir(zk as CompiledCircuit);
                            const backend = new UltraHonkBackend(zk.bytecode);

                            const input = {
                              birth_year: year,
                              current_year: new Date().getFullYear().toString(),
                            };

                            const { witness } = await noir.execute(input);
                            const proof = await backend.generateProof(witness);
                            const isValid = await backend.verifyProof(proof);

                            setIsProofValid(isValid); // ✅ Update proof status
                            console.log(
                              `Proof is ${isValid ? "valid" : "invalid"}... ✅`
                            );
                          } catch (e) {
                            console.log("error", e);
                            setIsProofValid(false);
                          }
                        }}
                      />

                      <button
                        onClick={register}
                        className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 disabled:opacity-50"
                        disabled={
                          !authorName.trim() || isRegistering || !isProofValid
                        }
                      >
                        {isRegistering
                          ? "Registering..."
                          : "Register as Author"}
                      </button>

                      <button
                        onClick={() => navigate("/")}
                        className="bg-gray-300 text-white px-4 py-2 rounded-md hover:bg-gray-400"
                      >
                        Back
                      </button>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* Main Writing UI */}
      <main className="min-h-screen  min-w-screen px-4 sm:px-6 py-6">
        {isRegistered && activeTab === "writing" && (
          <section className="bg-white max-w-4xl mx-auto items-center  p-4 sm:p-6 rounded-xl shadow-md space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-orange-600">
              Start Writing
            </h2>

            {/* Title input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Story Title
              </label>
              <input
                type="text"
                placeholder="Enter story title"
                className="w-full p-2 sm:p-3 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                value={storyTitle}
                onChange={(e) => setStoryTitle(e.target.value)}
              />
            </div>

            {/* Rich Text */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Story Content
              </label>
              <div className="border  border-orange-300 rounded-lg">
                <RichTextEditor title={storyTitle} />
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default Writing;
