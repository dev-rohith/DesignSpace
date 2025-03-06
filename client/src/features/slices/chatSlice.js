import { createSlice } from "@reduxjs/toolkit";
import { createChatRoom, getMessages, getRooms, sendMessage } from "../actions/chatActions";

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
        state.chatRoomId = action.payload
      },

      setMessages: (state, action) => {
        console.log(action.payload)
        state.messages = action.payload
      },
      addPrevMessages: (state, action) => {
        state.messages.data.unshift(...action.payload.data)
        state.messages.page = action.payload.page
        state.messages.totalPages = action.payload.totalPages
      },
      addNewMessage: (state, action) => {
        state.messages.data.push(action.payload)
      },
      setPeerUser: (state, action) => {
        state.peerUser = action.payload
      },
      setPeerUserStatus: (state, action) =>{
        state.peerUser.isOnline = action.payload.status
        if( action.payload?.lastActive && (state.peerUser.lastActive !== action.payload.lastActive)){
          state.peerUser.lastActive = action.payload.lastActive
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
    })
    builder.addCase(sendMessage.fulfilled, (state, action) => {
      state.isMessageSending = false;
    })
    builder.addCase(sendMessage.rejected, (state, action) => {
      state.isMessageSending = false;
      state.error = action.payload;
    });



  }
});

export default chatSlice.reducer;

export const { setChatRoomId, setPeerUser, setMessages, addPrevMessages, addNewMessage, setPeerUserStatus, setIsMessageSending } = chatSlice.actions;
