import React, { useState } from "react";

interface ZKProofFormProps {
  writerAddress: string;
}

const ZKProofForm: React.FC<ZKProofFormProps> = ({ writerAddress }) => {
  const [proof, setProof] = useState("");

  const handleSubmitProof = () => {
    console.log(`Submitting ZK proof for writer: ${writerAddress}`);

    try {
      alert(`ZK proof submitted for ${writerAddress}`);
    } catch (error) {
      alert(`Error submitting ZK proof ${error}`);
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-xl font-medium mb-3">Submit ZK Proof (Optional)</h3>
      <input
        type="text"
        placeholder="Proof data (e.g., previous tip hashes)"
        value={proof}
        onChange={(e) => setProof(e.target.value)}
        className="w-full p-3 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button
        onClick={handleSubmitProof}
        className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
      >
        Submit Proof
      </button>
    </div>
  );
};

export default ZKProofForm;
