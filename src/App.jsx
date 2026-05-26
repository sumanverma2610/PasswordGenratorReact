import { useState, useCallback,useEffect , useRef } from 'react'
import './App.css'

function App() {
const [length, setLength] = useState(8);
const[numAllow , setNumAllow] = useState(false);
const[charAllow , setCharAllow] = useState(false);
const[password , setPassword] = useState("");

// useRef Hook 
const passwordRef = useRef(null);
const passwordGenerator = useCallback(() =>{
  let pass = "";
  let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  if(charAllow){
    str += "!@#$%^&*()_+";
  }
  if(numAllow){
    str += "0123456789";
  }
  for(let i = 0; i < length; i++){
    pass += str.charAt(Math.floor(Math.random() * str.length));
  }
  setPassword(pass);
}, [length , numAllow , charAllow, setPassword])

const ClipboardCopy = useCallback(() => {
  passwordRef.current?.select();
  passwordRef.current?.setselectionRange(0, 20);
  window.navigator.clipboard.writeText(password);
}, [password])
useEffect(() => {
  passwordGenerator();
}, [passwordGenerator,length , numAllow , charAllow])
  return (
    <>

  <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">

  <h1 className="text-3xl font-bold mb-6">
    Password Generator
  </h1>

  <div className="bg-gray-800 p-6 rounded-xl w-[400px]">

    <div className="flex gap-2 mb-4">

      <input
        type="text"
        value={password}
        readOnly
        ref ={passwordRef}
        className="w-full p-3 rounded-lg text-white bg-gray-700"
      />

      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={ClipboardCopy}>
        Copy
      </button>

    </div>

    <div className="flex items-center gap-2 mb-4">

      <input
        type="range"
        min={8}
        max={20}
        value={length}
        onChange={(e) => setLength(e.target.value)}
      />

      <label>Password Length: {length}</label>

    </div>

    <div className="flex items-center gap-2 mb-2">

      <input
        type="checkbox"
        checked={numAllow}
        onChange={() => setNumAllow((prev) => !prev)}
      />

      <label>Numbers</label>

    </div>

    <div className="flex items-center gap-2">

      <input
        type="checkbox"
        checked={charAllow}
        onChange={() => setCharAllow((prev) => !prev)}
      />

      <label>Special Characters</label>

    </div>

  </div>

</div>
    </>
  )
}

export default App
