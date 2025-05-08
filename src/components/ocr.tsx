import React, { useState } from "react";
import Tesseract from "tesseract.js";

export default function KtpOcr({
  onExtractBirthdate,
}: {
  onExtractBirthdate: (birthdate: string) => void;
}) {
  const [, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      runOCR(file);
    } else {
      setMessage("No image selected.");
    }
  };

  const runOCR = async (file: File) => {
    setLoading(true);
    setMessage("Processing image, please wait...");
    try {
      const {
        data: { text },
      } = await Tesseract.recognize(file, "ind");
      console.log("OCR Text:", text);

      const dobMatch = text.match(/\b\d{2}[-/.]\d{2}[-/.]\d{4}\b/);
      if (dobMatch) {
        onExtractBirthdate(dobMatch[0]);
        setMessage(`Birthdate found: ${dobMatch[0]}`);
      } else {
        setMessage("Birthdate not found.");
      }
    } catch (error) {
      console.error("OCR Error:", error);
      setMessage("Failed to process the image.");
    }
    setLoading(false);
  };

  return (
    <div className="w-full max-w-md p-4 border border-orange-300 rounded-xl shadow-sm bg-white space-y-3">
      <label className="block text-sm font-semibold text-gray-700 mb-1">
        Upload KTP Image
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 cursor-pointer"
      />
      {loading && (
        <p className="text-sm text-orange-600 animate-pulse">
          Detecting text...
        </p>
      )}
      {!loading && message && (
        <p className="text-sm text-gray-700">{message}</p>
      )}
    </div>
  );
}
