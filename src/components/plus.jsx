import { useState } from "preact/hooks";
import NewBox from "./new_box";

export default function PlusBox({ handleSubmit }) {
  const [mode, setMode] = useState('edit') // or 'edit'

  const toggleHandler = (e) => {
    e.preventDefault()
    setMode(mode == 'edit' ? 'plus' : 'edit')
  }

  return (
    mode == 'plus' ?   
      <div className={`box box--plus`}>
        <a href="#" onClick={toggleHandler}>
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <rect x="45" y="10" width="10" height="80" fill="black" />
            <rect x="10" y="45" width="80" height="10" fill="black" />
          </svg>
        </a>
      </div> :
      <NewBox handleSubmit={handleSubmit} closeHandler={toggleHandler} />
  );
}
