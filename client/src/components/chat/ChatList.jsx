import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { format, isToday, isThisWeek, parseISO } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { getRooms } from "../../features/actions/chatActions";
import toast from "react-hot-toast";
import ErrorState from "../common/placeholders/ErrorState";
import Spinner from "../common/Spinner";
import {  setChatRoomId } from "../../features/slices/chatSlice";

const ChatList = () => {
  const { chatRooms, isLoading, error } = useSelector((store) => store.chat);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    (async () => {
      const actionResult = await dispatch(getRooms());
      if (getRooms.rejected.match(actionResult)) {
        toast.error(actionResult.payload.message);
      }
    })();
  }, [dispatch]);

  const handleSetCurrentChat = (roomId) => {
    if(!roomId) return
    dispatch(setChatRoomId(roomId))
  }

  const formatMessagePreview = (message) => {
    if (!message || !message.messageType) return "Start a conversation";

    const previews = {
      image: "📷 Photo",
      file: "📎 File",
    };

    if (previews[message.messageType]) return previews[message.messageType];

    return message.content && message.content.length > 20
      ? `${message.content.slice(0, 20)}...`
      : message.content || "Start a conversation";
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "";

    try {
      const date =
        typeof timestamp === "string"
          ? parseISO(timestamp)
          : new Date(timestamp);

      if (isToday(date)) {
        return format(date, "hh:mm a");
      }

      if (isThisWeek(date)) {
        return format(date, "EEE");
      }

      return format(date, "MMM d");
    } catch (e) {
      console.error("Date formatting error:", e);
      return "";
    }
  };


  if (isLoading) return <Spinner />;

  if (error) {
    return (
      <div className="w-72 border-r border-gray-200 h-screen">
        <ErrorState error={error} />
      </div>
    );
  }

  if (!chatRooms || chatRooms.length === 0) {
    return (
      <div className="w-72 border-r border-gray-200 h-screen flex items-center justify-center">
        <div className="text-center p-4">
          <p className="text-gray-500 text-sm mb-3">No messages yet</p>
          {user.role === "client" && (
            <Link
              to="/design-space/designers"
              className="bg-violet-500 text-white text-sm px-3 py-1.5 rounded-md hover:bg-violet-600 transition"
            >
              Find Designers
            </Link>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-72 border-r border-gray-200 h-screen flex flex-col">
      <div className="p-3 border-b border-gray-200 flex items-center justify-between">
        <h1 className="text-lg font-medium">Messages</h1>
        {user.role === "client" && (
          <Link
            to="/design-space/designers"
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M11 5a1 1 0 112 0v5.5h5.5a1 1 0 110 2H13V18a1 1 0 11-2 0v-5.5H5.5a1 1 0 110-2H11V5z" />
            </svg>
          </Link>
        )}
      </div>

      <div className="overflow-y-auto flex-grow">
        {chatRooms.map((chatRoom) => {
          const otherUser =
            user.role === "client" ? chatRoom.designer : chatRoom.client;
          const lastMessage = chatRoom.lastMessage;
          const profilePic = otherUser.profilePicture || otherUser.profilePic;
          const isActive = location.pathname === `/chat/${chatRoom._id}`;
          
          return (
            <div
              onClick={()=>handleSetCurrentChat(chatRoom?._id)}
              key={chatRoom._id}
              className={`block transition border-l-2 ${
                isActive
                  ? "bg-blue-50 border-l-blue-500"
                  : "hover:bg-gray-50 border-l-transparent"
              }`}
            >
              <div className="px-3 py-2.5 flex items-start">
                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden mr-3 flex-shrink-0">
                  {profilePic ? (
                    <img
                      src={profilePic}
                      alt={otherUser.firstName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-blue-500 text-white text-sm first-letter:uppercase">
                      {otherUser.firstName}
                    </div>
                  )}
                </div>

                <div className="flex-grow min-w-0">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-sm truncate">
                      {otherUser.firstName} {otherUser.lastName || ""}
                    </h3>
                    <span className="text-xs text-gray-400 flex-shrink-0">
                      {lastMessage && formatTimestamp(lastMessage.createdAt)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-1">
                    <p
                      className={`text-xs truncate ${
                        !lastMessage ||
                        lastMessage.read ||
                        lastMessage.sender === user._id
                          ? "text-gray-500"
                          : "text-gray-900 font-medium"
                      }`}
                    >
                      {formatMessagePreview(lastMessage)}
                    </p>

                    <div className="flex-shrink-0 flex items-center">
                      {chatRoom.isFreeTrial && (
                        <span className="mr-1.5 text-xs bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded-sm">
                          Trial
                        </span>
                      )}

                      {lastMessage &&
                        !lastMessage.read &&
                        lastMessage.sender !== user._id && (
                          <span className="bg-blue-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                            1
                          </span>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChatList;
