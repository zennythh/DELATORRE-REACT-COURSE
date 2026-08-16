import { useRef, useEffect, type DependencyList} from 'react'
import { ChatMessage } from './ChatMessage'
import '../styles/ChatMessages.css'

type ChatMessagesProps = {  
  chatMessages: {
    id: string;
    message: string;
    sender: string;
  }[];
  isLoading: boolean;
}
export function ChatMessages({ chatMessages, isLoading } : ChatMessagesProps){    
  const chatMessagesRef = useAutoScroll([chatMessages, isLoading]);        

  function useAutoScroll(dependencies: DependencyList){
    const chatMessagesRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
      const containerElem = chatMessagesRef.current;
      if (containerElem) {
        containerElem.scrollTop = containerElem.scrollHeight;
      }
    }, dependencies);
    return (chatMessagesRef);
  }
  
  return (
    <div
      className="chat-messages"
      ref={chatMessagesRef}
    > 
    {chatMessages.length !== 0 ?            
    (chatMessages.map((chatMessage) => {
      return (
        <ChatMessage 
          message={chatMessage.message}
          sender={chatMessage.sender}
          key={chatMessage.id}
        />
        );
        })
      ) : (
        <div
          className="welcome-msg"
        > Welcome to the chatbot project! Send a message using the textbox below.
        </div>
        )}
      
        {isLoading && (
          <ChatMessage
            message="loading-spinner"
            sender="chatbot"
          />
         )}
      </div>
    );
}
    