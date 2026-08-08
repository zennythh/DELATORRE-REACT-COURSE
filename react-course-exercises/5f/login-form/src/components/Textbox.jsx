import '../styles/Textbox.css'

export function Textbox({ placeholder, type }) {
  return (
    <div>
      <input 
        className="textboxes"
        placeholder={placeholder}
        type={type}
      />
    </div> 
  );
}