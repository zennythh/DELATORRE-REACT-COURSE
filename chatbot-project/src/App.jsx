import { useState, useEffect } from 'react'
import { Chatbot } from 'supersimpledev'
import { ChatInput } from './components/ChatInput'
import { ChatMessages } from './components/ChatMessages'
import './App.css'

function App() {
  const [ chatMessages, setChatMessages ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(false);

  useEffect(()=> {
    Chatbot.addResponses(
        {
          truth: 'Truth? There are microplastics in ur water',
          yow:'wasap',
          shabu: 'shhhhhh',
          galing: 'saludo',
          iyot: 'tara',
          aljean: 'nagjajakol sa jnv'
        }
    );
  }, [])
  
  return (
    <div
      className="app-container"
    > 
    <ChatMessages 
      chatMessages={chatMessages}
      isLoading={isLoading}
    />
    <ChatInput
      chatMessages={chatMessages}
      setChatMessages={setChatMessages}
      isLoading={isLoading}
      setIsLoading={setIsLoading}
    />      
    </div>
  );
}

export default App
