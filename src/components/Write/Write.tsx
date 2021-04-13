import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import './Write.css';
import { Button } from "@chakra-ui/react"
import { Badge } from "@chakra-ui/react"
import { toBase64, Base64ToImage } from "../../utils/base64";

import { v4 as uuidv4 } from 'uuid';
import firebase from 'firebase';
import { firestore } from "../../firebase.js";

const labelColors = ["blue", "cyan", "gray", "green", "orange", "pink", "purple", "red", "teal", "yellow", "blackAlpha", "linkedin", "facebook", "messenger", "whatsapp", "twitter", "telegram"];

interface strObj {  
  [key: string]: string;
}

function Write(props: RouteComponentProps) {  
  let [title, setTitle] = useState<string>("");
  let [labels, setLabels] = useState<any>([]);
  let [curLabel, setCurLabel] = useState<any>("");
  let [thumbnail, setThumbnail] = useState<string | null>(null);
  let [labelTheme, setLabelTheme] = useState<any>([]);

  const changeLabel = (e: any) => {    
    const { value } = e.target
    let labelInfo = {
      theme: "",
      value: value
    }
    setCurLabel(labelInfo);        
  }
  
  const addLabel = () => {
    let randomIdx: number = Math.floor(Math.random() * labelColors.length);
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

  const removeLabel = (e: any) => {
    const { textContent } = e.target
    const copyLabels = [...labels];
    
    copyLabels.forEach((label, i) => {
      if(label.value === textContent){
        copyLabels.splice(i,1);
      }
    })

    setLabels(copyLabels);    
  }

  const renderLabel = () => {    
    return labels.map(
      (label: any, idx: number) => {
        return <Badge onClick={removeLabel} colorScheme={label.theme} key={`label-${idx}`} fontSize="1em">{label.value}</Badge>;
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

  const postArticle = () => {
    let text: string | string[] = document.getElementsByClassName("textarea input-border")[0].innerHTML;    
    // text.length < 300 ? text : text.substring(0,300);
    let date: Date = new Date();
    let month: string | number= date.getMonth()+1 < 10 ? `0${date.getMonth()+1}` : date.getMonth()+1;
    let dateForm: string = `${date.getFullYear()}-${month}-${date.getDate()} ${date.getHours() + 1}:${date.getMinutes() + 1}:${date.getSeconds() + 1}`
    let id: string = uuidv4();

    if(title.length === 0) {
      alert("제목을 입력하세요.");
      return;
    }
    else if(text.length === 0){
      alert("본문내용을 입력하세요.");
      return;
    }

    // 여유있을 때 개선
    text = text.replaceAll("<div>", "||");
    text = text.replaceAll("</div>", "");
    text = text.replaceAll("<img", "||<img");
    text = text.replaceAll("<br>", "");
    text = text.split("||");

    let textSample: string = "" ;

    text.forEach((txt) => {
      if(textSample.length < 210 && !txt.includes("img")){
        textSample += txt;
      }
    })

    let postInfo = {
      id: id,
      title: title,
      text: text,
      textSample: textSample,
      date: dateForm,
      thumbnail: thumbnail,
      labels: labels,      
    }
    console.log(postInfo)
    firestore.collection("articles").doc("articles")
    .update({
        // Firebase 배열에 값 add
        articles: firebase.firestore.FieldValue.arrayUnion(postInfo)
    })
    .then(() => {
        props.history.push("/")
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
                    if(e.key === "Enter" && curLabel.value.length !== 0){                      
                      addLabel();
                    }
                  }
                }
              />
              <div className="labels-wrapper">{renderLabel()}</div>
              <div className="btn-wrapper">
                <Button colorScheme="gray" variant="outline" onClick={postArticle}>저장</Button>
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