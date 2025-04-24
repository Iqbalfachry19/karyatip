import React, { useState } from "react";

const TipButton = ({ writerAddress }) => {
  const [amount, setAmount] = useState("");

  const handleTip = async () => {
    console.log(`Sending ${amount} IDRX to ${writerAddress}`);

    try {
      alert(`Successfully tipped ${amount} IDRX to ${writerAddress}`);
    } catch (error) {
      alert("Error sending tip");
    }
  };

  return (
    <div className="mb-6">
      <h3 className="text-xl font-medium mb-3">Send Tip</h3>
      <input
        type="number"
        placeholder="Amount (IDRX)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-3 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button
        onClick={handleTip}
        className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700"
      >
        Send Tip
      </button>
    </div>
  );
};

export default TipButton;
