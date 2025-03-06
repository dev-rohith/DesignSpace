import React from 'react';
import { format, formatDistanceToNow } from 'date-fns';
import { Clock } from 'lucide-react';

const ChatHeader = ({ peerUser }) => {
  
  if (!peerUser) {
    return null;
  }

  const {
    firstName,
    lastName,
    profilePicture,
    isOnline,
    lastActive
  } = peerUser;

  const fullName = `${firstName} ${lastName}`;
  
  const getLastActiveText = () => {
    if (isOnline) return 'Online';
    
    const lastActiveDate = new Date(lastActive);
    const now = new Date();
    const isToday = lastActiveDate.toDateString() === now.toDateString();
    
    if (isToday) {
      return `Last seen ${formatDistanceToNow(lastActiveDate, { addSuffix: true })}`;
    } else {
      return `Last seen on ${format(lastActiveDate, 'MMM dd, yyyy')} at ${format(lastActiveDate, 'h:mm a')}`;
    }
  };

  return (
    <div className="w-full bg-white shadow-sm border-b border-gray-200 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="relative">
          <img 
            src={profilePicture} 
            alt={fullName} 
            className="w-10 h-10 rounded-full object-cover"
          />
          <div 
            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
              isOnline ? 'bg-green-500' : 'bg-gray-400'
            }`}
          />
        </div>
        
        <div>
          <h3 className="font-semibold text-gray-800">{fullName}</h3>
          <div className="flex items-center text-xs text-gray-500">
            {!isOnline && <Clock size={12} className="mr-1" />}
            <span>{getLastActiveText()}</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        {/* ---------------- place holder here ---------- */}
      </div>
    </div>
  );
};

export default ChatHeader;