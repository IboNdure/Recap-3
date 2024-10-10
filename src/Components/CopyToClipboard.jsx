import { useState, useEffect } from "react";

export default function CopyClipboard({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true); // Show confirmation message
    } catch (error) {
      console.error("Failed to copy text: ", error);
    }
  };

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false); // Hide confirmation after 3 seconds
      }, 3000);

      return () => clearTimeout(timer); // Cleanup timeout on component unmount
    }
  }, [copied]);

  return (
    <div>
      <button onClick={handleCopy}>Copy to Clipboard</button>
      {copied && <p className="copy-confirmation">Copied!</p>}
    </div>
  );
}
