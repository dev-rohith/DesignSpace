import { createSlice } from "@reduxjs/toolkit";
import {
  createChatRoom,
  getMessages,
  getRooms,
  sendMessage,
} from "../actions/chatActions";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chatRooms: [],
    isLoadingRooms: false,
    chatRoomsError: null,

    chatRoomId: null,
    messages: {
      data: [],
      page: 0,
      totalPages: 0,
    },
    isLoadingMessages: false,
    messagesError: null,
    peerUser: null,
    isMessageSending: false,
  },
  reducers: {
    setChatRoomId: (state, action) => {
      state.chatRoomId = action.payload;
      state.messages.page = 0; //reseting to prevent the stale replication state in redux(messges) for targetting getmessages api call
      state.messages.totalPages;
    },

    setMessages: (state, action) => {
      state.messages.data = action.payload.data.reverse(); // Reverse to maintain correct chat flow
      state.messages.totalPages = action.payload.totalPages;
      state.messages.page = action.payload.page;
    },

    addPrevMessages: (state, action) => {
      state.messages.data.unshift(...action.payload.data.reverse()); // Reverse before unshifting to keep order
      state.messages.page = action.payload.page;
      state.messages.totalPages = action.payload.totalPages;
    },

    addNewMessage: (state, action) => {
      state.messages.data.push(action.payload); // New message goes at the bottom (real-time)
    },
    setPeerUser: (state, action) => {
      state.peerUser = action.payload;
    },
    setPeerUserStatus: (state, action) => {
      state.peerUser.isOnline = action.payload.status;
      if (
        action.payload?.lastActive &&
        state.peerUser.lastActive !== action.payload.lastActive
      ) {
        state.peerUser.lastActive = action.payload.lastActive;
      }
    },
    updateChatView: (state, action) => {
      const chatRoom = state.messages.data.find(
        (message) => message.chatRoom === action.payload._id
      );
      if (chatRoom) {
        state.messages.data.map((message) => {
          if (!message.read) {
            message.read = true;
            message.readAt = action.payload.readAt;
          }
          return message;
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getRooms.fulfilled, (state, action) => {
      state.chatRooms = action.payload;
    });
    builder.addCase(getRooms.rejected, (state, action) => {
      state.chatRooms = null;
    });

    builder.addCase(getMessages.rejected, (state, action) => {
      state.messagesError = action.payload;
    });

    builder.addCase(sendMessage.pending, (state) => {
      state.isMessageSending = true;
    });
    builder.addCase(sendMessage.fulfilled, (state, action) => {
      state.isMessageSending = false;
    });
    builder.addCase(sendMessage.rejected, (state, action) => {
      state.isMessageSending = false;
    });
  },
});

export default chatSlice.reducer;

export const {
  setChatRoomId,
  setPeerUser,
  setMessages,
  addPrevMessages,
  addNewMessage,
  setPeerUserStatus,
  setIsMessageSending,
  resetMessages,
  updateChatView,
} = chatSlice.actions;
