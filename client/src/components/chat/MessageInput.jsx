import React, { useState, useRef } from "react";
import { Paperclip, X, Send, FileText } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";

const MessageInput = ({ onSend, onTyping }) => {
  const { isMessageSending } = useSelector((state) => state.chat);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const fileInputRef = useRef(null);
  const sendInputRef = useRef(null);

  const handleChange = (e) => {
    setMessage(e.target.value);
    onTyping(e.target.value.length > 0);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);

      if (selectedFile.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setFilePreview(e.target.result);
        };
        reader.readAsDataURL(selectedFile);
      } else {
        setFilePreview(null);
      }
    }
  };

  const clearFile = () => {
    setFile(null);
    setFilePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSend(message, file);
      clearFile();
      onTyping(false);
      setMessage("");
      sendInputRef.current.focus()
    } catch (error) {
      console.error("Send error:", error);
    }
  };

  return (
    <div className="p-3 border-t border-violet-200">
      {/* preview  */}
      {filePreview && (
        <div className="relative mb-2 inline-block">
          <img
            src={filePreview}
            alt="Preview"
            className="h-24 rounded-lg border border-violet-300 shadow-sm animate-fade"
          />
          <button
            onClick={clearFile}
            className="absolute -top-2 -right-2 bg-violet-500 text-white rounded-full p-1 shadow-md hover:bg-violet-600 transition"
            type="button"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {file && !filePreview && (
        <div className="relative mb-2 inline-block bg-violet-50 p-2 rounded-lg border border-violet-300 animate-fade">
          <div className="flex items-center">
            <FileText className="w-5 h-5 mr-2 text-violet-500" />
            <span className="text-sm text-violet-700">{file.name}</span>
          </div>
          <button
            onClick={clearFile}
            className="absolute -top-2 -right-2 bg-violet-500 text-white rounded-full p-1 shadow-md hover:bg-violet-600 transition"
            type="button"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
      {/*form*/}
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="text-violet-500 hover:text-violet-700 p-2 rounded-full hover:bg-violet-100 transition"
          disabled={isMessageSending}
        >
          <Paperclip className="w-5 h-5" />
        </button>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/jpeg,image/png,audio/mp3,application/pdf,video/mp4"
        />

        <input
          type="text"
          ref={sendInputRef}
          value={message}
          onChange={handleChange}
          placeholder="Type a message..."
          className="flex-1 rounded-full border border-violet-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white shadow-sm transition-all"
          disabled={isMessageSending}
        />

        <button
          type="submit"
          className={`rounded-full p-2 shadow-sm transition-all ${
            message.trim() || file
              ? "bg-violet-500 hover:bg-violet-600 text-white"
              : "bg-violet-200 text-violet-300 cursor-not-allowed"
          }`}
          disabled={(!message.trim() && !file) || isMessageSending}
        >
          {isMessageSending ? (
            <div className="w-5 h-5 flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
            </div>
          ) : (
            <Send className="w-5 h-5" />
          )}
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
