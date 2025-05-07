import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import { useReadContract } from "wagmi";
import { KARYATIP_ADDRESS } from "../constants";
import { karyatipABI } from "../utils/abi";

const WorkPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // const authorName = "Alicia Moon";
  // const authorAddress = "0xAbcd...1234";

  const [decodedTitle, setDecodedTitle] = useState<string>("");
  const [htmlContent, setHtmlContent] = useState<string>("");

  // Fetching works from the smart contract using wagmi's useContractRead
  const {
    data: allWorks,
    isError,
    isLoading,
  } = useReadContract({
    address: KARYATIP_ADDRESS,
    abi: karyatipABI,
    functionName: "getAllWorks",
  });
  console.log(allWorks);

  useEffect(() => {
    if (allWorks && allWorks.length > 0) {
      // Convert id from URL params to BigInt

      // Find the work by matching the BigInt id
      const work = allWorks.find((work) => work.id.toString() === id);
      if (work) {
        const sanitizedContent = DOMPurify.sanitize(work.content);
        setHtmlContent(sanitizedContent);
        setDecodedTitle(work.title); // Set the title of the work
      }
    }
  }, [allWorks, id]);
  if (isLoading) {
    return (
      <div className="min-h-screen min-w-screen bg-orange-50 text-gray-800 font-sans flex items-center justify-center">
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
      <div className="min-h-screen min-w-screen bg-orange-50 text-gray-800 font-sans flex items-center justify-center">
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

  return (
    <div className="min-h-screen min-w-screen bg-orange-50 text-gray-800 font-sans">
      <Header />
      <div className="max-w-3xl mx-auto">
        <section className="mx-2  mt-10 bg-white p-8 rounded-2xl shadow-lg">
          {/* Title & Author */}
          <div className="space-y-1 mb-6">
            <h1 className="text-4xl font-extrabold text-orange-600">
              {decodedTitle}
            </h1>
            {/* <div className="flex items-center gap-3 text-sm text-gray-500">
            <div className="w-8 h-8 rounded-full bg-orange-200 flex items-center justify-center font-bold text-orange-600">
              {authorName.charAt(0)}
            </div>
            <div>
              <div className="font-medium">{authorName}</div>
              <div className="text-xs">{authorAddress}</div>
            </div>
          </div> */}
          </div>

          {/* Render sanitized rich content */}
          <div
            className="prose max-w-none text-gray-700 leading-relaxed mb-8"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          ></div>

          <button
            onClick={() => navigate(`/writers`)}
            className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition"
          >
            Back
          </button>
        </section>
      </div>
    </div>
  );
};

export default WorkPage;
