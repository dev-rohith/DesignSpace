import { useCallback, useEffect, useRef, useState } from "react";
import MessageItem from "./MessageItem";
import TypingIndicator from "../common/placeholders/TypingIndicator";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "lucide-react";
import { getMessages } from "../../features/actions/chatActions";
import toast from "react-hot-toast";

const MessageList = ({ messages, currentUserId, peerTyping }) => {
  const {
    isLoadmoreMessages,
    messages: messagesData,
    chatRoomId,
  } = useSelector((store) => store.chat);
  const totalPages = messagesData.totalPages;
  const page = messagesData.page;

  const typingRef = useRef(null);
  const containerRef = useRef(null);
  const loadMoreRef = useRef(null);
  const prevScrollHeight = useRef(null);
  const isMounted = useRef(false);
  const isLoadingRef = useRef(false);
  const dispatch = useDispatch();

  const handleLoadMore = useCallback(() => {
    if (isLoadingRef.current) return;
    
    if (page <= totalPages) {  //!important only load more if we're not at the last page
      isLoadingRef.current = true;
      
      (async () => {
        try {
          const actionResult = await dispatch(
            getMessages({ chatRoomId, page: page + 1 })
          );
          if (getMessages.rejected.match(actionResult)) {
            console.log(actionResult.payload);
            toast.error(actionResult.payload.message);
          }
        } catch (error) {
          console.error("Error loading messages:", error);
        } finally {
          setTimeout(() => {
            isLoadingRef.current = false;  //throttle in different way with setting timeout
          }, 2000);   //clean up not needed since it not effecting lifecycle
        }
      })();
    }
  }, [page, totalPages, chatRoomId, dispatch]);

  useEffect(() => {
    if (!loadMoreRef.current || !containerRef.current || !isMounted.current) {
      if (!isMounted.current) isMounted.current = true;
      return;
    }

    let observer = null;
    
    // Only setting up observer if we're not at the last page
    if (page !== totalPages) {
      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry && entry.isIntersecting && !isLoadingRef.current) {
            handleLoadMore();
          }
        },
        {
          root: containerRef.current,
          threshold: 0.1,
        }
      );

      const currentRef = loadMoreRef.current;
      if (currentRef) observer.observe(currentRef);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [handleLoadMore, page, totalPages]);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    if (prevScrollHeight.current && containerRef.current) {
      const container = containerRef.current;
      const newScrollHeight = container.scrollHeight;
      container.scrollTop = newScrollHeight - prevScrollHeight.current;
      prevScrollHeight.current = null;
    }
  }, [messages]);

  useEffect(() => {
    if (!typingRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const isNearBottom =
      container.scrollHeight - container.clientHeight <=
      container.scrollTop + 100;

    if (isNearBottom) {
      typingRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [peerTyping]);

  return (
    <div ref={containerRef} className="space-y-4 overflow-y-auto h-full">
      {page !== totalPages && <div ref={loadMoreRef} className="h-2" />}

      {isLoadmoreMessages && (
        <div className="flex items-center justify-center py-4">
          <Loader className="animate-spin" />
        </div>
      )}

      {messages.map((message, index) => (
        <MessageItem
          key={ index}
          message={message}
          isOwnMessage={message.sender._id === currentUserId}
        />
      ))}

      <div ref={typingRef}>{peerTyping && <TypingIndicator />}</div>
    </div>
  );
};

export default MessageList;