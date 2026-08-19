import { useState } from 'react'
import { Chatbot } from 'supersimpledev'
import '../styles/ChatInput.css'

export function ChatInput({ chatMessages, setChatMessages, isLoading, setIsLoading }){
  const [ inputText, setInputText ] = useState('');
  
  function saveInputText(event){
    setInputText(event.target.value);
  }

  async function sendMessage(){
    if ( isLoading || inputText === ''){
      return;
    }
    
    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender:'user',
        id: crypto.randomUUID()
      }
    ]
    setChatMessages(newChatMessages)
    setInputText('');
    
    setIsLoading(true);
    const response = await Chatbot.getResponseAsync(inputText);
    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender:'chatbot',
        id: crypto.randomUUID()
      }
    ])
    setIsLoading(false);
  }
  
  function keyPress(event){
    // console.log(event.key);
    if (event.key === 'Enter'){
      sendMessage();
    } else if (event.key === 'Escape' /*|| event.key === 'Backspace'*/){
      setInputText('');
    }
    // The " || event.key === 'Backspace' " clause is to provide 
    // a mobile device alternative to an Esc key. Remove as needed.
  }
  
  return (
    <div
      className="chat-input-container"
    >
      <input 
        placeholder="Send a message to the chatbot" 
        size="30"
        value={inputText}
        onChange={saveInputText}
        onKeyDown={keyPress}
        className="chat-input"
      />
      <button 
        onClick={sendMessage}
        className="send-button"
      > Send </button>
    </div>
  );
}

