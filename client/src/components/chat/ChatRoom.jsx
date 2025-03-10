import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMessages, sendMessage } from "../../features/actions/chatActions";
import { useSocket } from "../../context/SocketContext";
import {
  addNewMessage,
  setPeerUser,
  setPeerUserStatus,
  updateChatView,
} from "../../features/slices/chatSlice";
import toast from "react-hot-toast";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import Spinner from "../common/Spinner";
import ErrorState from "../common/placeholders/ErrorState";

const ChatRoom = () => {
  const { chatRooms, chatRoomId, messages, messagesError, peerUser } =
    useSelector((store) => store.chat);
  const { user } = useSelector((store) => store.auth);
  const { socket, joinRoom, leaveRoom, sendTyping, sendViewed } = useSocket();

  const [peerTyping, setPeerTyping] = useState(false);
  const page = messages.page || 1;

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
        socket.on("update_read", handleViewMessages);
      }
    }

    return () => {
      if (chatRoomId) {
        leaveRoom(chatRoomId);
        if (socket) {
          socket.off("new_message", handleNewMessage);
          socket.off("typing", handleTypingIndicator);
          socket.off("user_status", handleUserStatus);
          socket.on("update_read", handleViewMessages);
        }
        dispatch(setPeerUser(null));
      }
    };
  }, [chatRoomId, socket]);

  useEffect(() => {
    const fetchMessages = async () => {
      const actionResut = await dispatch(getMessages({ chatRoomId, page }));
      if (getMessages.rejected.match(actionResut)) {
        console.log(actionResut.payload);
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
       sendViewed(chatRoomId);
    };
    if (chatRoomId) {
       fetchMessages();
    }
    

  }, [chatRoomId, page, user._id, chatRooms, dispatch, sendViewed]); //important dependencies here
  //  console.log(chatRoomId)
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
      console.log(actionResult.payload);
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
    // console.log(data);
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

   //only handling the double check we can also do the list notification it will be implemented in upcomming versions
  const handleViewMessages = (data) => {
     dispatch(updateChatView(data))
  };

  if (!peerUser && messages.length === 0) return <Spinner />;

  if (messagesError) return <ErrorState error={messagesError} />;

  return (
    <div className="flex flex-col h-screen w-full">
      <ChatHeader peerUser={peerUser} />

      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
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
