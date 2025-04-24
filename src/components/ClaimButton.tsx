import React from "react";

const ClaimButton = ({ writerAddress }) => {
  const handleClaim = async () => {
    console.log(`Claiming tips for writer at ${writerAddress}`);

    try {
      alert(`Successfully claimed tips for writer ${writerAddress}`);
    } catch (error) {
      alert("Error claiming tips");
    }
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
