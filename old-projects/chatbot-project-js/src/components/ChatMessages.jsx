import { useRef, useEffect } from 'react'
import { ChatMessage } from './ChatMessage'
import '../styles/ChatMessages.css'

export function ChatMessages({ chatMessages, isLoading }){    
  const chatMessagesRef = useAutoScroll([chatMessages, isLoading]);        

  function useAutoScroll(dependencies){
    const chatMessagesRef = useRef(null);
    
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
    