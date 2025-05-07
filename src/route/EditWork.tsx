import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import DOMPurify from "dompurify";
import { KARYATIP_ADDRESS } from "../constants";
import { karyatipABI } from "../utils/abi";
import Header from "../components/Header";

const EditWorkPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { address: currentAddress } = useAccount();
  const [decodedTitle, setDecodedTitle] = useState("");
  const [htmlContent, setHtmlContent] = useState("");
  const [workOwner, setWorkOwner] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);
  const {
    data: allWorks,
    isLoading,
    isError,
  } = useReadContract({
    address: KARYATIP_ADDRESS,
    abi: karyatipABI,
    functionName: "getAllWorks",
  });

  const { writeContractAsync: updateWork } = useWriteContract();

  useEffect(() => {
    if (allWorks && allWorks.length > 0 && id) {
      const work = allWorks.find((work) => work.id.toString() === id);
      if (work) {
        setDecodedTitle(work.title);
        setHtmlContent(DOMPurify.sanitize(work.content));
        setWorkOwner(work.author);
      }
    }
  }, [allWorks, id]);
  useEffect(() => {
    if (editorRef.current && htmlContent) {
      editorRef.current.innerHTML = htmlContent;
    }
  }, [htmlContent]);
  const handleSave = async () => {
    if (!id || !editorRef.current) return;

    const sanitizedContent = DOMPurify.sanitize(editorRef.current.innerHTML);

    try {
      setIsSaving(true);
      await updateWork({
        address: KARYATIP_ADDRESS,
        abi: karyatipABI,
        functionName: "updateWork",
        args: [BigInt(id), decodedTitle, sanitizedContent],
      });
      navigate(`/work/${id}`);
    } catch (error) {
      console.error("Error updating work:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const isOwner = workOwner?.toLowerCase() === currentAddress?.toLowerCase();
  // Function to apply text styles
  const applyStyle = (command: string, value: string = "") => {
    if (editorRef.current) {
      document.execCommand(command, false, value);
    }
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading work.</div>;
  }
  const insertLink = () => {
    const url = prompt("Enter the URL:");
    if (url) {
      document.execCommand("createLink", false, url);
    }
  };

  const insertImage = () => {
    const url = prompt("Enter the image URL:");
    if (url) {
      // Escape the URL input to avoid injection
      const safeUrl = DOMPurify.sanitize(url, {
        ALLOWED_TAGS: [],
        ALLOWED_ATTR: [],
      });
      const imgTag = `<img src="${safeUrl}" alt="image" class="max-w-full h-auto rounded-lg"/>`;
      document.execCommand("insertHTML", false, imgTag);
    }
  };

  return (
    <div className="min-h-screen min-w-screen bg-orange-50 text-gray-800 font-sans relative">
      {/* Header */}
      <Header />

      {/* Main Edit Work UI */}
      {isOwner ? (
        <main className="min-h-screen px-4 sm:px-6 py-6">
          <section className="bg-white max-w-4xl mx-auto items-center p-4 sm:p-6 rounded-xl shadow-md space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-orange-600">
              Edit Your Work
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
                value={decodedTitle}
                onChange={(e) => setDecodedTitle(e.target.value)}
              />
            </div>

            {/* Rich Text */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Story Content
              </label>
              <div className="border  border-orange-300 rounded-lg">
                <div className=" p-6 bg-gray-50 rounded-lg shadow-lg">
                  <div className="md:flex md:space-y-0 space-y-2 w-3xs  space-x-4 mb-6">
                    <button
                      onClick={() => applyStyle("bold")}
                      className="px-4 py-2 text-white bg-orange-500 hover:bg-orange-600 rounded"
                    >
                      <strong>B</strong>
                    </button>
                    <button
                      onClick={() => applyStyle("italic")}
                      className="px-4 py-2 text-white bg-orange-500 hover:bg-orange-600 rounded"
                    >
                      <em>I</em>
                    </button>
                    <button
                      onClick={() => applyStyle("underline")}
                      className="px-4 py-2 text-white bg-orange-500 hover:bg-orange-600 rounded"
                    >
                      <u>U</u>
                    </button>
                    <button
                      onClick={insertLink}
                      className="px-4 py-2 text-white bg-orange-500 hover:bg-orange-600 rounded"
                    >
                      Link
                    </button>
                    <button
                      onClick={insertImage}
                      className="px-4 py-2 text-white bg-orange-500 hover:bg-orange-600 rounded"
                    >
                      Image
                    </button>
                  </div>
                  {/* Upload section */}
                  {/* <div className="space-y-3">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-500 file:text-white hover:file:bg-orange-600"
        />
        <button
          className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
          onClick={handleUpload}
          disabled={!file}
        >
          Upload Image
        </button>

        {link && (
          <div className="mt-4">
            <p className="text-sm text-gray-500 mb-1">Image Preview:</p>
            <MediaRenderer client={client} src={link} />
          </div>
        )}
      </div> */}
                  <div
                    ref={editorRef}
                    className="p-4 bg-white border border-gray-300 rounded-lg min-h-[300px] overflow-auto focus:ring-2 focus:ring-orange-500"
                    contentEditable
                    suppressContentEditableWarning
                    data-placeholder="Start typing your content here..."
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between gap-4">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 disabled:opacity-50"
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </button>

              <button
                onClick={() => navigate(`/work/${id}`)}
                className="bg-gray-300 text-white px-4 py-2 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </section>
        </main>
      ) : (
        <div className="min-h-screen min-w-screen bg-orange-50 text-gray-800 font-sans relative flex items-center justify-center">
          <div className="bg-white mx-2 p-6 rounded-xl shadow-lg max-w-md w-full text-center space-y-4 border border-orange-200">
            <h2 className="text-xl font-semibold text-orange-600">
              You are not the owner of this work.
            </h2>
            <p className="text-gray-600">Only the author can edit this work.</p>
            <button
              onClick={() => navigate(`/work/${id}`)}
              className="bg-gray-300 text-white px-4 py-2 rounded-md hover:bg-gray-400"
            >
              Back to Work
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditWorkPage;
