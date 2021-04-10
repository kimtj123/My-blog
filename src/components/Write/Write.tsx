import React, { useState, useRef } from 'react';
import './Write.css';
import { Button } from "@chakra-ui/react"
import { Badge } from "@chakra-ui/react"
import {toBase64, Base64ToImage} from "../../utils/base64";

import { firestore } from "../../firebase.js";
import { v4 as uuidv4 } from 'uuid';
import { Checkbox ,Radio, RadioGroup, Stack } from "@chakra-ui/react"

const labelColors = ["blue", "cyan", "gray", "green", "orange", "pink", "purple", "red", "teal", "yellow", "whiteAlpha", "blackAlpha", "linkedin", "facebook", "messenger", "whatsapp", "twitter", "telegram"];

interface strObj {  
  [key: string]: string;
}

function Write() {
  let [title, setTitle] = useState<string>("");
  let [thumbnail, setThumbnail] = useState<HTMLImageElement | undefined>();
  let [labels, setLabels] = useState<any>([]);
  let [curLabel, setCurLabel] = useState<any>("");
  let [labelTheme, setLabelTheme] = useState<any>([]);

  const changeLabel = (e: any) => {    
    const { name, value } = e.target
    let labelInfo = {
      theme: "",
      value: value
    }
    setCurLabel(labelInfo);        
  }
  
  const addLabel = (e: any) => {
    let randomIdx: number = Math.floor(Math.random() * 18);
    let newTheme: string = labelColors[randomIdx];
    let oldLabels: string[] = [];
    let labelInfo: strObj = {
      theme: newTheme,
      value: curLabel.value
    }
    let initCurLabel: strObj = {
      theme: "",
      value: ""
    }
    
    if (!labelTheme.includes(newTheme)){        
      oldLabels = [...labels, labelInfo];
    }
    else {
      oldLabels.forEach((label)=> {
        if(newTheme !== label) {
          labelInfo.theme = label;
          oldLabels = [...labels, labelInfo];
          return;
        }
      })
      return;
    }

    setLabels(oldLabels);
    setCurLabel(initCurLabel);
    setLabelTheme([...labelTheme, newTheme]);
  }

  const renderLabel = () => {    
    return labels.map(
      (label: any, idx: number) => {
        return <Badge colorScheme={label.theme} key={`label-${idx}`} fontSize="1em">{label.value}</Badge>;
      }
    )
  }

  const onFileLoad = async (e:any) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      for (let i = 0; i < e.dataTransfer.items.length; i++) {
        // If dropped items aren't files, reject them
        if (e.dataTransfer.items[i].kind === 'file') {
          let file = e.dataTransfer.items[i].getAsFile();
          toBase64(file)
          .then((res: any) => {
            let textArea = document.getElementsByClassName("textarea")[0]
            Base64ToImage(res, textArea, thumbnail, setThumbnail);
          })
          .catch((err: any) => {
            console.error(err);
          })
        }
      }
    }
  }

  const chkPost = () => {
    let text: string = document.getElementsByClassName("textarea input-border")[0].innerHTML;
    let articleID: string = uuidv4();
    let date = new Date()
    let month = date.getMonth()+1 < 10 ? `0${date.getMonth()+1}` : date.getMonth()+1;
    let dateForm = `${date.getFullYear()}-${month}-${date.getDate()}`

    let postInfo = {
      date: dateForm,
      thumbnail: thumbnail,
      label: labels,
      text: text,
      title: title
    }
    
    firestore.collection("articles").doc(articleID).set(postInfo)
    .then(() => {
        console.log("Document successfully written!");
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });
  
  }
  
  return (
    <div id="write">          
      <div className="write-wrapper">
        <div className="write-content">
          <div className="write-content-border">
            <div className="write-title">
              <input className="input-border" placeholder="제목" onChange={(e) => setTitle(e.target.value)}/>
            </div>
            <div className="write-text">
              <div className="textarea input-border" contentEditable="true" placeholder="내용" 
                  onDrop={(e) => onFileLoad(e)}                  
              />
            </div>
            <div className="write-footer">
              <input 
                className="input-border" 
                placeholder="#을 사용해 라벨 생성"
                value={curLabel.value} 
                onChange={changeLabel} 
                onKeyPress={
                  (e) => {
                    if(e.key === "Enter"){
                    addLabel(e)
                    }
                  }
                }
              />
              <div className="labels-wrapper">
                { renderLabel() }
              </div>
              <div className="btn-wrapper">
                <Button colorScheme="gray" variant="outline" onClick={chkPost}>저장</Button>
              </div>
            </div>
          </div>
        </div>
        <div className="write-outside"></div>
      </div>
    </div>
  );
}

export default Write;