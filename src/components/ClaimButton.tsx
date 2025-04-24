import React from "react";

interface ClaimButtonProps {
  writerAddress: string;
}

const ClaimButton = ({ writerAddress }: ClaimButtonProps) => {
  const handleClaim = async () => {
    console.log(`Claiming tips for writer at ${writerAddress}`);

    alert(`Successfully claimed tips for writer ${writerAddress}`);
  };

  return (
    <div className="mt-6">
      <h3 className="text-xl font-medium mb-3">Claim Tips</h3>
      <button
        onClick={handleClaim}
        className="w-full py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700"
      >
        Claim Tips
      </button>
    </div>
  );
};

export default ClaimButton;
