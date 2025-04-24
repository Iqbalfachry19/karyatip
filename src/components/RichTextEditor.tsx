import { useRef } from "react";

const RichTextEditor = () => {
  const editorRef = useRef<HTMLDivElement>(null);

  // Function to apply formatting commands (e.g., bold, italic, underline)
  const applyStyle = (command: string, value: string = "") => {
    if (editorRef.current) {
      document.execCommand(command, false, value);
    }
  };

  // Function to insert a link at the cursor
  const insertLink = () => {
    const url = prompt("Enter the URL:");
    if (url) {
      // Get the selected text and create a link element
      document.execCommand("createLink", false, url);
    }
  };

  // Function to insert an image at the cursor
  const insertImage = () => {
    const url = prompt("Enter the image URL:");
    if (url) {
      const imgTag = `<img src="${url}" alt="image" class="max-w-full h-auto rounded-lg"/>`;
      // Insert the image HTML at the current cursor position
      document.execCommand("insertHTML", false, imgTag);
    }
  };

  // Function to handle content change (for saving or further processing)
  const handleSave = () => {
    if (editorRef.current) {
      console.log("Saved content:", editorRef.current.innerHTML);
      alert("Content saved!");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      {/* Toolbar */}
      <div className="flex space-x-4 mb-6">
        <button
          className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition duration-200"
          onClick={() => applyStyle("bold")}
        >
          <strong>B</strong>
        </button>
        <button
          className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition duration-200"
          onClick={() => applyStyle("italic")}
        >
          <em>I</em>
        </button>
        <button
          className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition duration-200"
          onClick={() => applyStyle("underline")}
        >
          <u>U</u>
        </button>
        <button
          className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700 transition duration-200"
          onClick={insertLink}
        >
          Link
        </button>
        <button
          className="px-4 py-2 text-white bg-purple-600 rounded hover:bg-purple-700 transition duration-200"
          onClick={insertImage}
        >
          Image
        </button>
      </div>

      {/* Rich Text Editor */}
      <div
        ref={editorRef}
        className="p-6 border border-gray-300 rounded-lg min-h-[300px] text-gray-900 bg-white overflow-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
        contentEditable
        suppressContentEditableWarning
      >
        <p>Start writing here...</p>
      </div>

      {/* Save Button */}
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
