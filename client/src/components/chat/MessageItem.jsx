import React, { useEffect, useRef } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { FileText, Music, Video, Check, Download } from 'lucide-react';

const MessageItem = ({ message, isOwnMessage }) => {
  const messageRef = useRef(null);

  // Auto-scroll when a new message appears
  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [message]);

  const formattedTime = message?.createdAt 
    ? formatDistanceToNow(new Date(message.createdAt), { addSuffix: true }) 
    : 'just now';

  const renderMessageContent = () => {
    const fileType = message?.media?.fileType || '';
    const fileName = message?.media?.fileName || 'File';
    const fileUrl = message?.media?.url;

    // Image handling
    if (message.messageType === 'image' || fileType.startsWith('image/')) {
      return (
        <div className="mt-2">
          <div className="rounded-lg overflow-hidden border border-gray-200">
            <img 
              src={fileUrl} 
              alt={fileName} 
              className="max-w-full h-auto max-h-64 rounded-lg object-cover"
            />
          </div>
          {message.content && <p className={`text-sm mt-2 ${isOwnMessage ? 'text-blue-50' : 'text-gray-700'}`}>{message.content}</p>}
        </div>
      );
    }

    // Audio handling
    if (message.messageType === 'audio' || fileType.startsWith('audio/')) {
      return (
        <div className="mt-2 w-full">
          <div className="rounded-lg overflow-hidden border border-gray-200 p-2 bg-gray-50 flex items-center">
            <Music className="w-5 h-5 mr-2 text-gray-600" />
            <audio controls className="w-full">
              <source src={fileUrl} type={fileType} />
            </audio>
            <a href={fileUrl} download={fileName} className="ml-2 text-gray-600 hover:text-gray-900">
              <Download className="w-5 h-5" />
            </a>
          </div>
        </div>
      );
    }

    // Video handling
    if (message.messageType === 'video' || fileType.startsWith('video/')) {
      return (
        <div className="mt-2">
          <div className="rounded-lg overflow-hidden border border-gray-200">
            <video src={fileUrl} controls className="max-w-full h-auto max-h-64 rounded-lg" />
          </div>
          <a href={fileUrl} download={fileName} className="mt-2 block text-blue-600 hover:text-blue-800 text-sm">
            <Download className="inline w-4 h-4 mr-1" /> Download Video
          </a>
        </div>
      );
    }

    // Default message
    return <p className={`${isOwnMessage ? 'text-white' : 'text-gray-800'}`}>{message.content}</p>;
  };

  return (
    <div ref={messageRef} className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-4`}>
      <div 
        className={`max-w-xs sm:max-w-md p-3 rounded-lg ${
          isOwnMessage 
            ? 'bg-blue-500 text-white rounded-br-none' 
            : 'bg-white border border-gray-200 rounded-bl-none'
        }`}
      >
        {!isOwnMessage && (
          <div className="font-semibold text-sm mb-1 text-blue-700">
            {message?.sender?.firstName} {message?.sender?.lastName}
          </div>
        )}
        
        {renderMessageContent()}
        
        <div 
          className={`text-xs mt-1 flex items-center justify-end ${
            isOwnMessage ? 'text-blue-100' : 'text-gray-500'
          }`}
        >
          {formattedTime}
          {isOwnMessage && (
            <span className="ml-2 flex items-center">
              {message.read ? (
                <Check className="w-3 h-3 text-blue-100" />
              ) : (
                <Check className="w-3 h-3 text-blue-300 opacity-70" />
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageItem;