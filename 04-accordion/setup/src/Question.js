import React, { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
const Question = ({ title, info }) => {

  const [showInfo, setShowInfo] = useState(false)

  const btnClick = () => {
    setShowInfo(showInfo => !showInfo)
  }

  return (
    <article className='question'>

      <header>
        <h4>{title}</h4>
        <button className="btn" onClick={btnClick}>{showInfo ? <AiOutlinePlus /> : <AiOutlineMinus />}</button>
      </header>
      {showInfo && <p>{info}</p>}
    </article>
  );
};

export default Question;
