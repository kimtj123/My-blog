import React, { ReactElement, ReactHTMLElement, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import './post.css';
import { Button, Badge,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton, } from "@chakra-ui/react"
import firebase from 'firebase';
import { firestore } from "../../../firebase.js";

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

  const removePost: () => void = ()=> {
    alert("")
    firestore.collection("articles").doc("articles")  
    .update({
        // Firebase 배열에 값 remove
        articles: firebase.firestore.FieldValue.arrayRemove(postInfo)
    })
    .then(() => {
        props.history.push("/")
        console.log("Document successfully written!");
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });
  }

  const BasicUsage:() => any = () =>{
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
      <>
        <Button colorScheme="red" onClick={onOpen}>삭제</Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Warning</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              정말로 이 글을 삭제하시겠습니까?
            </ModalBody>
  
            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button colorScheme="red" onClick={removePost}>삭제</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
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
              <div className="btn-wrapper">
                { BasicUsage() }                
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