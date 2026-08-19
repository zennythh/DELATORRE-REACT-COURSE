import { useState, useEffect } from 'react'
import { Chatbot } from 'supersimpledev'
import { ChatInput } from './components/ChatInput'
import { ChatMessages } from './components/ChatMessages'
import './App.css'
import RobotProfile from './assets/robot.png'

function App() {
  const [ chatMessages, setChatMessages ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(false);
  let num = chatMessages.length;
  let title = `${num} ${num === 1 ? 'message' : 'messages'}`

  useEffect(()=> {
    Chatbot.addResponses(
        {
          truth: 'Truth? There are microplastics in ur water',
          yow:'wasap',
          shabu: 'shhhhhh',
          galing: 'saludo',
          labas: 'tol',
          aljean: 'mabait'
        }
    );
  }, [])
  
  return (
    <>
    <link rel="icon" href={RobotProfile} />
    <title>{title}</title>


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
    </>
  );
}

export default App
