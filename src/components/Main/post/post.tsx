import React, { ReactElement, ReactHTMLElement, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import './post.css';
import { Button, Badge } from "@chakra-ui/react"


function Post(props: RouteComponentProps) {  
  let postInfo: any = props.location.state;

  const renderText:() => any = () => {    
    return postInfo.text.map((txt: string, i: number) => {
      if(txt.includes("<img")){
        txt = txt
              .replace("<img src=\"","")
              .replace("\">","");

        return <img src={txt} alt={"post-img-" + i}/>
      }
      else if(txt.length === 0){
        return <br />
      }
      else{
        return <p>{txt}</p>
      }
    })
  }

  const renderLabels: () => any = () => {
    return postInfo.labels.map((label: any) => {
      return <Badge colorScheme={label.theme} fontSize="1rem">{label.value}</Badge>;
    })
  }

  return (
    <div id="post">          
      <div className="post-wrapper">
        <div className="post-content">
          <div className="post-content-border">
            <div className="post-title">
              <div className="title">{postInfo.title}</div>
              <div className="date">{postInfo.date}</div>
            </div>
            <div className="post-text">
              <div className="textarea input-border">
                { renderText() }
              </div>
            </div>
            <div className="post-footer">              
              <div className="labels-wrapper">
                { renderLabels() }
              </div>              
            </div>
          </div>
        </div>
        <div className="post-outside"></div>
      </div>
    </div>
  );
}

export default Post;