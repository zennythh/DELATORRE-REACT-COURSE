import '../styles/ChatMessage.css'
import dayjs from 'dayjs';
import RobotProfile from '../assets/robot.png'
import UserProfile from '../assets/customUser.jpeg'
import LoadingSpinner from '../assets/loading-spinner.gif'

export function ChatMessage({ message, sender }){
  return (
    <div
      className={
        sender === 'chatbot' 
        ? 'chatbot-msg'
        : 'user-msg'}
    >
      {sender === "chatbot" && (
        <img src={RobotProfile}
          className="chat-profile"
        />
      )}
      
      <div
        className="msg-text"
      >
      {message === "loading-spinner" ? 
        (
            <img src={LoadingSpinner}
              className="loading-spinner"
            />              
        ) : (message) 
      }
        <p className="timestamp"> {message !== "loading-spinner" ? 
        (dayjs(dayjs().valueOf()).format('h:mma'))
        : (null)}
        </p>
      </div>
      {sender === "user" && (
        <img src={UserProfile}
          className="chat-profile"
        />
      )}
    </div>
    );
}
