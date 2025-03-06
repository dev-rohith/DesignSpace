import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMessages, sendMessage } from "../../features/actions/chatActions";
import { useSocket } from "../../context/SocketContext";
import {
  addNewMessage,
  setPeerUser,
  setPeerUserStatus,
} from "../../features/slices/chatSlice";
import toast from "react-hot-toast";
import Spinner from "../common/Spinner";
import ErrorState from "../common/placeholders/ErrorState";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

const ChatRoom = () => {
  const {
    chatRooms,
    chatRoomId,
    messages,
    isLoadingMessages,
    messagesError,
    peerUser,
  } = useSelector((store) => store.chat);
  const { user } = useSelector((store) => store.auth);
  const { socket, joinRoom, leaveRoom, sendTyping } = useSocket();

  const [page, setPage] = useState(1);
  const [peerTyping, setPeerTyping] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const typingTimeoutRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (chatRoomId) {
      joinRoom(chatRoomId);

      if (socket) {
        socket.on("new_message", handleNewMessage);
        socket.on("typing", handleTypingIndicator);
        socket.on("user_status", handleUserStatus);
      }
    }

    return () => {
      if (chatRoomId) {
        leaveRoom(chatRoomId);
        if (socket) {
          socket.off("new_message", handleNewMessage);
          socket.off("typing", handleTypingIndicator);
          socket.off("user_status", handleUserStatus);
        }
        dispatch(setPeerUser(null));
      }
    };
  }, [chatRoomId, socket]);

  useEffect(() => {
    const fetchMessages = async () => {
      const actionResut = await dispatch(getMessages({ chatRoomId, page }));
      if (getMessages.rejected.match(actionResut)) {
        toast.error(actionResut.payload.message);
      }
      const currentRoom = chatRooms.find((room) => room._id === chatRoomId);
      if (!currentRoom) {
        toast.error();
        navigate("/design-space/designers");
      }
      const peer =
        user.role === "client" ? currentRoom.designer : currentRoom.client;
      dispatch(setPeerUser(peer));
    };
    if (chatRoomId) {
      fetchMessages();
    }
  }, [chatRoomId, page, user._id]);

  const handleSendMessage = async (content, file) => {
    if (!content && file) content = "";
    if (!content && !file) return;
    const fromData = new FormData();
    fromData.append("content", content);
    if (file) {
      fromData.append("file", file);
    }

    const actionResult = await dispatch(
      sendMessage({ chatRoomId, data: fromData })
    );
    if (sendMessage.rejected.match(actionResult)) {
      toast.error(actionResult.payload.message);
    }
  };

  const handleTyping = (isTyping) => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    sendTyping(chatRoomId, isTyping);

    if (isTyping) {
      typingTimeoutRef.current = setTimeout(() => {
        sendTyping(chatRoomId, false);
      }, 3000);
    }
  };

  const handleNewMessage = async (data) => {
    dispatch(addNewMessage(data.message));
    setPeerTyping(false);
  };

  const handleTypingIndicator = (data) => {
    if (data.userId !== user._id) {
      setPeerTyping(data.typing);
    }
  };

  const handleUserStatus = (data) => {
    if (peerUser && data.userId !== peerUser._id) return;
    dispatch(setPeerUserStatus(data));
  };

  if (isLoadingMessages && !peerUser && messages.length === 0)
    return <Spinner />;

  if (messagesError) return <ErrorState error={messagesError} />;

  return (
    <div className="flex flex-col h-screen w-full">
      <ChatHeader peerUser={peerUser} />

      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {/* {hasMore && (
          <button
            // onClick={loadMoreMessages}
            className="w-full py-2 text-sm text-gray-500 hover:text-gray-700"
            disabled={loading}
          >
            {loading ? "Loading more..." : "Load earlier messages"}
          </button>
        )} */}

        <MessageList
          messages={messages.data}
          currentUserId={user._id}
          peerTyping={peerTyping}
        />
      </div>

      <MessageInput onSend={handleSendMessage} onTyping={handleTyping} />
    </div>
  );
};
export default ChatRoom;
