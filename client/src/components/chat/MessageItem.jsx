import React, { useEffect, useRef } from "react";
import { formatDistanceToNow } from "date-fns";
import {
  FileText,
  Music,
  Video,
  Check,
  Download,
  CheckCheck,
} from "lucide-react";

const MessageItem = ({ message, isOwnMessage }) => {
  const messageRef = useRef(null);

  // auto-scroll when a new message appears
  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [message]);

  const formattedTime = message?.createdAt
    ? formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })
    : "just now";

  const renderMessageContent = () => {
    const fileType = message?.media?.fileType || "";
    const fileName = message?.media?.fileName || "File";
    const fileUrl = message?.media?.url;

    if (fileType.startsWith("image/")) {
      // I am using the mime type on both ends so
      return (
        <div className="">
          <div className="rounded-t-lg overflow-hidden border border-gray-200">
            <img
              src={fileUrl}
              alt={fileName}
              className="max-w-full rounded-t-lg p-1 hover:scale-105 hover:shadow hover:border-0 transition-all ease-in bg-white h-auto max-h-64  object-cover"
            />
          </div>
          {message.content && (
            <p
              className={` px-2 font-montserrat  text-sm mt-2 ${
                isOwnMessage ? "text-white" : "text-gray-700"
              }`}
            >
              {message.content}
            </p>
          )}
        </div>
      );
    }
    //audio handling
    if (fileType.startsWith("audio/")) {
      return (
        <div className="w-80 border border-t-black border-l-black border-r-black">
          <div className="overflow-hidden bg-blue-400">
            <div className="relative w-full bg-white  overflow-hidden shadow-inner">
              <audio
                controls
                className="w-full h-10 focus:outline-none"
                style={{
                  backgroundColor: "transparent",
                  filter: "contrast(4)",
                }}
              >
                <source src={fileUrl} type={fileType} />
                Your browser does not support the audio element.
              </audio>
            </div>

            <div className="flex items-center py-1 pl-2">
              <div className="p-2 rounded-full bg-indigo-100 mr-3">
                <Music className="w-2 h-2 text-indigo-600" />
              </div>
              <div className="flex-1 truncate text-sm font-medium text-gray-700">
                {fileName || "Audio message"}
              </div>
              <a
                href={fileUrl}
                download={fileName}
                className="ml-2 p-2 rounded-full hover:bg-indigo-100 transition-colors duration-200"
                title="Download audio"
              >
                <Download className="w-4 h-4 text-indigo-600" />
              </a>
            </div>
          </div>
        </div>
      );
    }

    // video handling
    if (message.messageType === "video" || fileType.startsWith("video/")) {
      return (
        <div className="p-1">
          <div className="rounded-lg overflow-hidden border border-gray-200">
            <video
              src={fileUrl}
              controls
              className="max-w-full h-auto max-h-64 rounded-lg"
            />
          </div>
          <a
            href={fileUrl}
            download={fileName}
            className="mt-2 block tex-white-600 hover:text-blue-800 px-2 text-sm"
          >
            <Download className="inline w-4 h-4 mr-1" /> Download Video
          </a>
        </div>
      );
    }

    // Default message
    return (
      <p className={` p-3 ${isOwnMessage ? "text-white " : "text-gray-800"}`}>
        {message.content}
      </p>
    );
  };

  return (
    <div
      ref={messageRef}
      className={`flex ${isOwnMessage ? "justify-end" : "justify-start"} mb-4`}
    >
      <div
        className={`max-w-xs sm:max-w-md  rounded-lg ${
          isOwnMessage
            ? "bg-blue-500 text-white rounded-br-none"
            : "bg-white border border-gray-200 rounded-bl-none"
        }`}
      >
        {!isOwnMessage && (
          <div className="font-semibold px-2 pt-1 text-sm mb-1 text-blue-600 first-letter:uppercase">
            {message?.sender?.firstName} {message?.sender?.lastName}
          </div>
        )}

        {/*rendering content by invoking fuction so that i can access data without prop drilling alternative to component approch*/}
        {renderMessageContent()}

        <div
          className={`text-xs mt-1 flex items-center px-3 pb-2 justify-end ${
            isOwnMessage ? "text-blue-100" : "text-gray-500"
          }`}
        >
          {formattedTime}
          {isOwnMessage && (
            <span className="ml-2 flex items-center">
              {message.read ? (
                <CheckCheck className="w-3 h-3 text-white" />
              ) : (
                <Check className="w-3 h-3 text-white" />
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
