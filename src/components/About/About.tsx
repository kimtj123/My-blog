import React from 'react';
import './About.css';

import { CloseIcon } from '@chakra-ui/icons'

// import { Link, Route, BrowserRouter as Router } from "react-router-dom";
// import { Main } from '../Main/Main'

class About extends React.Component {
  constructor(props:any) {
    super(props);
    this.state = {
      date: new Date()
    };
  }

  render(){
    return (
    <div id="About">
      <div id="introduce-myself">
        <div className="about-header">
          <div className="header-left">
            <div className="header-icon"></div>
            <div className="header-name">TJ's Blog 속성</div>
          </div>
          <div className="header-divide"></div>
          <div className="header-right"><CloseIcon w={3} h={3}/></div>
        </div>
        <div className="about-body">
          <div className="wrap-tabs">
            <div className="tab first-tab"><div className="tab-name selected">일반</div></div>
            <div className="tab"><div className="tab-name">공유</div></div>
            <div className="tab"><div className="tab-name">보안</div></div>
            <div className="tab"><div className="tab-name adjust">이전 버전</div></div>
            <div className="tab"><div className="tab-name adjust2">사용자 지정</div></div>
            <div className="tab-blank"></div>
          </div>
          <div className="wrap-props">
            <div className="props-section"></div>
            <div className="props-section"></div>
            <div className="props-section"></div>
          </div>
        </div>
        <div className="about-footer">
          <div className ="button">확인</div>
          <div className ="button">취소</div>
          <div className ="button last">적용</div>
        </div>
      </div>
    </div>
  );}
}

export default About;
