import React, { useState, useEffect } from 'react';
import './Main.css';
import { Badge } from "@chakra-ui/react"
import { firestore } from "../../firebase.js";

interface objType {  
  [key: string]: any;
}

function Main() {  

  let db = firestore.collection("articles").doc("articles")
  const [datas, setDatas] = useState<objType | undefined>();

  useEffect(() => {        
    db.get()
    .then((doc: any) => {     
      if (doc.exists) {        
        if(!datas){
          setDatas(doc.data());
        }
      } else {
        console.error("Failed To Load Data From FireBase");
      }
    })
    console.log(datas);
    console.log("If you show this message more than twice, you pay to Google More than you need");
  })  

  const imgRendering = (thumbnail: any, id: string) => {    
    if(thumbnail === null || thumbnail.length === 0){
      return (<div className="no-image">no-image</div>)
    }
    else{
      let imgSrc = thumbnail.replaceAll("\"","");
      return (<img src={imgSrc}></img>)
    }   
  }

  const renderContents = () => {

    if(datas){
      return (datas.articles.map((data: objType, index: number) => {
        // let THIS: any = this;        
        console.log(data.thumbnail);
        return(
        <li key={index}>
          <a>
            <div className="wrap-content">
              <div className="article-content">
                <div className="left-width">
                  <p className="article-title">{data.title}</p>
                  <p className="article-text">{data.textSample}</p>
                  <div className="article-info left-width">
                    <span className="label">
                      {
                        data.labels.map((label:objType) => {
                          return <Badge colorScheme={label.theme} fontSize="1rem">{label.value}</Badge>
                        })                        
                      }
                    </span>
                    <span className="date">{data.date}</span>
                  </div>
                </div>
                <div className="img-content" id={data.id}>
                  {                                                                    
                    imgRendering(data.thumbnail, data.id)
                  }
                </div>
              </div>
            </div>
          </a>
        </li>
        )})
      )
    }
  }

  return (
    <div className="wrap-articles">
      <ul className="articles">        
        {
          renderContents()
        }
      </ul>
    </div>
  );
}

export default Main;
