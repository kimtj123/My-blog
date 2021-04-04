import React, { useState, useRef } from 'react';
import './Write.css';

import { firestore } from "../../firebase.js";
import { v4 as uuidv4 } from 'uuid';

function Write() {
  const [title, setTitle] = useState<string>("제목");
  const [text, setText] = useState<string>("내용");
  const [label, setLabel] = useState<[]>([]);
  const inputEl = useRef(null);

  return (
    <div id="write">
      
      <div className="write-wrapper">
        <div className="write-content">
          <div className="write-content-border">
            <div className="write-title">
              <input placeholder="제목" onChange={e => setTitle(e.target.value)}/>
            </div>
            <div className="write-text">
              <div className="textarea" contentEditable="true"placeholder="내용" onInput={e => console.log(e.currentTarget.textContent)}/>
            </div>
            <div className="write-label">
              <button onClick = {() => console.log("title : ", title)}>제목 테스트 </button>
              <button onClick = {() => console.log("text : ", text)}>내용 테스트 </button>
            </div>
          </div>
        </div>
        <div className="write-outside"></div>
      </div>
    </div>
  );
}

export default Write;