import { useRef } from "react";
import DOMPurify from "dompurify";

const RichTextEditor = () => {
  const editorRef = useRef<HTMLDivElement>(null);

  const applyStyle = (command: string, value: string = "") => {
    if (editorRef.current) {
      document.execCommand(command, false, value);
    }
  };

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

  const handleSave = () => {
    if (editorRef.current) {
      const dirtyHTML = editorRef.current.innerHTML;
      const cleanHTML = DOMPurify.sanitize(dirtyHTML, {
        USE_PROFILES: { html: true },
      });
      console.log("Sanitized content:", cleanHTML);
      alert("Content saved safely!");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => applyStyle("bold")}
          className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          {" "}
          <strong>B</strong>{" "}
        </button>
        <button
          onClick={() => applyStyle("italic")}
          className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          {" "}
          <em>I</em>{" "}
        </button>
        <button
          onClick={() => applyStyle("underline")}
          className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          {" "}
          <u>U</u>{" "}
        </button>
        <button
          onClick={insertLink}
          className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
        >
          {" "}
          Link{" "}
        </button>
        <button
          onClick={insertImage}
          className="px-4 py-2 text-white bg-purple-600 rounded hover:bg-purple-700"
        >
          {" "}
          Image{" "}
        </button>
      </div>

      <div
        ref={editorRef}
        className="relative p-6 border border-gray-300 rounded-lg min-h-[300px] text-gray-900 bg-white overflow-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Save Content
        </button>
      </div>
    </div>
  );
};

export default RichTextEditor;
