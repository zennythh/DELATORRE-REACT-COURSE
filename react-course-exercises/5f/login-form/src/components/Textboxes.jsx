import { useState } from 'react'
import { Textbox } from './Textbox'
import '../styles/Textboxes.css'

export function Textboxes(){
  const [ passwordVis, setPasswordVis ] = useState(true);
  
  function togglePasswordVis(){
    passwordVis ? setPasswordVis(false) : setPasswordVis(true);
  }
  
  return (
    <>
      <Textbox 
        placeholder="Email" 
      />
      <div
        className="passwordDiv"
      >
      <Textbox 
        placeholder="Password" 
        type={passwordVis ? "text" :"password"}
      />
      <button 
        className="show-hide-button"
        onClick={togglePasswordVis}
      > {passwordVis ? "Hide" : "Show"} </button>
      </div>
    </>
  );
}