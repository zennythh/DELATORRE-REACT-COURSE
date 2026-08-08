import '../styles/Button.css'

export function Button({ btnmessage }){
  return (
    <button
      className="buttons"
    > {btnmessage} </button>
  );
}