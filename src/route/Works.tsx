import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import { useReadContract, useWriteContract, useAccount } from "wagmi";
import { KARYATIP_ADDRESS } from "../constants";
import { karyatipABI } from "../utils/abi";

const WorkPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { address: currentAddress } = useAccount();

  const [decodedTitle, setDecodedTitle] = useState<string>("");
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [workOwner, setWorkOwner] = useState<string>("");
  const [notFound, setNotFound] = useState(false);

  const {
    data: allWorks,
    isError,
    isLoading,
  } = useReadContract({
    address: KARYATIP_ADDRESS,
    abi: karyatipABI,
    functionName: "getAllWorks",
  });

  const { writeContractAsync: deleteWork, isPending: isDeleting } =
    useWriteContract();

  useEffect(() => {
    if (isLoading) {
      setNotFound(false); // Reset saat loading
      return;
    }

    if (!allWorks || allWorks.length === 0 || !id) {
      setNotFound(true);
      return;
    }

    const work = allWorks.find((work) => work.id.toString() === id);
    if (work) {
      const sanitizedContent = DOMPurify.sanitize(work.content);
      setHtmlContent(sanitizedContent);
      setDecodedTitle(work.title);
      setWorkOwner(work.author);
      setNotFound(false);
    } else {
      setNotFound(true);
    }
  }, [allWorks, id, isLoading]);

  const handleDelete = async () => {
    if (!id) return;
    try {
      await deleteWork({
        address: KARYATIP_ADDRESS,
        abi: karyatipABI,
        functionName: "deleteWork",
        args: [BigInt(id)],
      });
      navigate("/writers");
    } catch (error) {
      console.error("Failed to delete work:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-orange-50">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-orange-500 border-dashed rounded-full animate-spin mx-auto mb-4" />
          <h2 className="text-lg font-semibold text-orange-600 mb-1">
            Loading Works...
          </h2>
          <p className="text-sm text-gray-500">
            Fetching stories from the chain.
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-orange-50">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-red-600 mb-1">
            Error Loading Works
          </h2>
          <p className="text-sm text-gray-500">
            Something went wrong while fetching data.
          </p>
        </div>
      </div>
    );
  }
  if (!isLoading && !isError && notFound) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-orange-50">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-600 mb-1">
            No Work Found
          </h2>
          <p className="text-sm text-gray-500">
            The work you're looking for does not exist or was removed.
          </p>
          <button
            onClick={() => navigate(`/writers`)}
            className="mt-4 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const isOwner = currentAddress?.toLowerCase() === workOwner?.toLowerCase();

  return (
    <div className="min-h-screen bg-orange-50 text-gray-800 font-sans">
      <Header />
      <div className="max-w-3xl mx-auto">
        <section className="mx-2 mt-10 bg-white p-8 rounded-2xl shadow-lg">
          <div className="space-y-1 mb-6">
            <h1 className="text-4xl font-extrabold text-orange-600">
              {decodedTitle}
            </h1>
            <p
              className="text-gray-500 text-sm mb-2 truncate w-full"
              title={workOwner}
            >
              by {workOwner}
            </p>
          </div>

          <div
            className="prose max-w-none text-gray-700 leading-relaxed mb-8"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />

          <div className="flex gap-3">
            <button
              onClick={() => navigate(`/writers`)}
              className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition"
            >
              Back
            </button>

            {isOwner && (
              <div className="flex gap-3">
                <button
                  onClick={() => navigate(`/writers/edit/${id}`)} // Navigate to edit page
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition"
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default WorkPage;
