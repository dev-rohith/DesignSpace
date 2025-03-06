import { useSelector } from "react-redux";
import InternalSidebar from "../components/layout/InternalSidebar";
import { Sidebar } from "../components";
import ChatList from "../components/chat/ChatList";
import ChatRoom from "../components/chat/ChatRoom";

const Mychat = () => {
  const { user } = useSelector((store) => store.auth);
  const { chatRoomId } = useSelector((store) => store.chat);

  return (
    <div className="flex">
      <div>
        {user.role === "client" && <Sidebar />}
        {user.role === "designer" && <InternalSidebar />}
      </div>
      <div className="flex-1 w-screen min-h-screen overflow-y-scroll">
        <div className="flex">
          <ChatList />
          {chatRoomId ? (
            <ChatRoom />
          ) : (
            <div className="flex flex-col w-full h-screen justify-center items-center">
              <h4 className="text-lg font-medium text-gray-700">
                No Chat Selected
              </h4>
              <p className="text-sm text-gray-500">
                Select a chat by clicking on a chat member.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Mychat;
