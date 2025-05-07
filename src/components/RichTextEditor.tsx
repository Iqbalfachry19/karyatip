import { useRef, useState } from "react";
import DOMPurify from "dompurify";
import { useAccount, useWriteContract } from "wagmi";
import { KARYATIP_ADDRESS } from "../constants";
// import { MediaRenderer } from "thirdweb/react";
// import { upload } from "thirdweb/storage";
// import { client } from "../config/Thirdweb";
import { karyatipABI } from "../utils/abi"; // Make sure you import the ABI

interface RichTextEditorProps {
  title: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ title }) => {
  const { writeContractAsync } = useWriteContract();
  const editorRef = useRef<HTMLDivElement>(null);
  const { isConnected, address } = useAccount();

  // const [file, setFile] = useState<File | null>(null);
  // const [link, setLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Function to apply text styles
  const applyStyle = (command: string, value: string = "") => {
    if (editorRef.current) {
      document.execCommand(command, false, value);
    }
  };

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files.length > 0) {
  //     setFile(e.target.files[0]);
  //   }
  // };

  // const handleUpload = async () => {
  //   if (!file) return;
  //   try {
  //     const uri = await upload({ client, files: [file] });
  //     setLink(uri);
  //   } catch (error) {
  //     console.error("Error uploading file:", error);
  //   }
  // };

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

  const handleSave = async () => {
    if (editorRef.current) {
      const dirtyHTML = editorRef.current.innerHTML;
      const cleanHTML = DOMPurify.sanitize(dirtyHTML, {
        USE_PROFILES: { html: true },
      });

      // Save the content on the blockchain
      if (isConnected && address) {
        try {
          setIsLoading(true);
          await writeContractAsync({
            address: KARYATIP_ADDRESS,
            abi: karyatipABI,
            functionName: "submitWork",
            args: [title, cleanHTML],
          });
          // Ensure the transaction is mined
          setIsSuccess(true);
        } catch (error) {
          console.error("Error saving content to blockchain:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        alert("Please connect your wallet!");
      }
    }
  };

  return (
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
        className="relative md:w-full w-3xs p-6 border border-gray-300 rounded-lg min-h-[300px] text-gray-900 bg-white overflow-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
        contentEditable
        suppressContentEditableWarning
        data-placeholder="Start typing your rich content here..."
        onInput={(e) => {
          const el = e.currentTarget;
          el.setAttribute(
            "data-empty",
            el.innerText.trim() === "" ? "true" : "false"
          );
        }}
        onBlur={(e) => {
          const el = e.currentTarget;
          el.setAttribute(
            "data-empty",
            el.innerText.trim() === "" ? "true" : "false"
          );
        }}
        data-empty="true"
      ></div>

      <div className="mt-6 flex justify-center">
        <button
          onClick={handleSave}
          className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg  transition duration-200"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save Content"}
        </button>
      </div>

      {isSuccess && (
        <p className="text-green-500 mt-4">Content saved successfully!</p>
      )}
    </div>
  );
};

export default RichTextEditor;
