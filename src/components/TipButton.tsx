import React, { useState } from "react";
import { erc20Abi, parseUnits } from "viem";
import { useAccount, useWriteContract } from "wagmi";
import { IDRX_SEPOLIA, KARYATIP_ADDRESS } from "../constants";
import { waitForTransactionReceipt } from "wagmi/actions";
import { config } from "../config/Web3Provider";
import { liskSepolia } from "viem/chains";
import { karyatipABI } from "../utils/abi";

interface TipButtonProps {
  writerAddress: string;
}

const TipButton: React.FC<TipButtonProps> = ({ writerAddress }) => {
  const [amount, setAmount] = useState("");
  const [approved, setApproved] = useState(false);

  const { address } = useAccount();
  const { writeContractAsync, isPending } = useWriteContract();

  const handleApprove = async () => {
    if (!address) {
      alert("Please connect your wallet");
      return;
    }
    const numericAmount = parseFloat(amount);
    if (numericAmount <= 0 || isNaN(numericAmount)) {
      alert("Amount must be greater than 0");
      return;
    }

    try {
      const parsedAmount = parseUnits(numericAmount.toString(), 2); // IDRX has 2 decimals
      const hash = await writeContractAsync({
        abi: erc20Abi,
        address: IDRX_SEPOLIA,
        functionName: "approve",
        args: [KARYATIP_ADDRESS, parsedAmount],
      });

      await waitForTransactionReceipt(config, {
        hash,
        chainId: liskSepolia.id,
      });

      setApproved(true);
      alert(`Approved ${numericAmount} IDRX`);
    } catch (error) {
      console.error("Approval failed", error);
      alert("Approval failed");
    }
  };

  const handleTip = async () => {
    try {
      const parsedAmount = parseUnits(parseFloat(amount).toString(), 2);
      console.log(`Sending ${parsedAmount} IDRX to ${writerAddress}`);

      // Di sinilah kamu akan memanggil smart contract untuk mengirimkan tip.
      // Misalnya seperti ini (pseudo):
      await writeContractAsync({
        abi: karyatipABI,
        address: KARYATIP_ADDRESS,
        functionName: "tipAuthor",
        args: [writerAddress, parsedAmount],
      });

      alert(`Berhasil memberi tip sebesar ${amount} IDRX ke ${writerAddress}`);
    } catch (error) {
      console.error("Tip failed", error);
      alert("Tip failed");
    }
  };

  return (
    <div className="mb-6">
      <h3 className="text-xl font-medium mb-3">Send Tip</h3>
      <input
        type="number"
        placeholder="Amount (IDRX)"
        value={amount}
        onChange={(e) => {
          setAmount(e.target.value);
          setApproved(false); // Reset approval when amount changes
        }}
        className="w-full p-3 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button
        onClick={handleApprove}
        disabled={isPending || approved}
        className={`w-full py-2 mb-2 ${
          approved ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        } text-white font-semibold rounded-md`}
      >
        {approved ? "Approved" : "Approve"}
      </button>
      <button
        onClick={handleTip}
        disabled={!approved}
        className={`w-full py-2 ${
          approved ? "bg-indigo-600 hover:bg-indigo-700" : "bg-gray-400"
        } text-white font-semibold rounded-md`}
      >
        Send Tip
      </button>
    </div>
  );
};

export default TipButton;
