import React, { useEffect, useState } from "react";
import QRCode from "qrcode";
import { generatePromptPayPayload } from "../utils/promptpay";
import { Copy, Check } from "lucide-react";

const PaymentQR = ({
  amount,
  phoneNumber = "0946761567",
  accountName = "PromptPrint Store",
}) => {
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (amount > 0 && phoneNumber) {
      const payload = generatePromptPayPayload(phoneNumber, amount);
      QRCode.toDataURL(payload, {
        width: 300,
        margin: 1,
        color: {
          dark: "#000000",
          light: "#ffffff",
        },
      })
        .then((url) => {
          setQrCodeUrl(url);
        })
        .catch((err) => {
          console.error("QR Code Error", err);
        });
    }
  }, [amount, phoneNumber]);

  const handleCopy = () => {
    navigator.clipboard.writeText(phoneNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-200 max-w-sm mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/c/c5/PromptPay-logo.png"
          alt="PromptPay"
          className="h-8 object-contain"
        />
        <span className="font-bold text-gray-700">Scan to Pay</span>
      </div>

      <div className="bg-white p-2 rounded-xl border border-gray-100 shadow-inner mb-4">
        {qrCodeUrl ? (
          <img
            src={qrCodeUrl}
            alt="Payment QR"
            className="w-64 h-64 rounded-lg"
          />
        ) : (
          <div className="w-64 h-64 bg-gray-100 animate-pulse rounded-lg flex items-center justify-center text-gray-400">
            Generating QR...
          </div>
        )}
      </div>

      <div className="text-center w-full space-y-2">
        <h3 className="text-2xl font-bold text-blue-600">
          ฿{amount.toLocaleString()}
        </h3>

        <div className="bg-gray-50 p-3 rounded-lg w-full flex items-center justify-between border border-gray-100">
          <div className="text-left">
            <p className="text-xs text-gray-500">PromptPay ID</p>
            <p className="font-mono font-medium text-gray-700">{phoneNumber}</p>
          </div>
          <button
            onClick={handleCopy}
            className="p-2 hover:bg-white rounded-full transition-colors relative"
            title="Copy ID"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : (
              <Copy className="w-4 h-4 text-gray-400" />
            )}
          </button>
        </div>

        <p className="text-sm text-gray-500 mt-2">
          Account Name:{" "}
          <span className="font-medium text-gray-900">{accountName}</span>
        </p>
      </div>
    </div>
  );
};

export default PaymentQR;
