import React, { useState, useEffect } from 'react';
import { Route, Link } from "react-router-dom"
import './Main.css';
import { Badge } from "@chakra-ui/react"
import { firestore } from "../../firebase.js";
import Post from "./post/post"

interface objType {  
  [key: string]: any;
}

function Main(prop: any) {  
  console.log("prop :: ", prop);
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
        return(
        <li key={index}>
          <Link to={{
            pathname: `/post/${data.title}`,
            state: data
          }}>
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
          </Link>
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
