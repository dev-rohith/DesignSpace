import { Schema,model } from "mongoose";


const MessageSchema = new mongoose.Schema({ 
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the sender (designer or client)
      required: true,
    },
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the recipient (designer or client)
      required: true,
    },
    content: {
      type: String, // Text
      required: true,
    },
    media: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Media", // Reference to the media  usefull for admin to see the media between the client and designer
      required: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });


const Message = model("Message", MessageSchema); 
   
export default Message;