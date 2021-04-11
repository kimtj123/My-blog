import React from 'react';
import './About.css';

import { CloseIcon } from '@chakra-ui/icons'
import { Checkbox } from "@chakra-ui/react"

type Info = {
    [prop: string]: any;
}

function AboutProperties(info: Info) {
    const tempImg = {
        backgroundImage: `url("/static/media/favicon.635626c1.ico")`
      }

        return (<div id="introduce-myself">
            <div className="about-header">
            <div className="header-left">
                <div className="header-icon"></div>
                <div className="header-name">TJ's Blog 속성</div>
            </div>
            <div className="seperation" />
            <div className="header-right"><CloseIcon w={3} h={3}/></div>
            </div>
            <div className="about-body">
            <div className="wrap-tabs">
                <div className="tab first-tab"><div className="tab-name selected">일반</div></div>
                <div className="tab"><div className="tab-name">공유</div></div>
                <div className="tab"><div className="tab-name">보안</div></div>
                <div className="tab"><div className="tab-name adjust">이전 버전</div></div>
                <div className="tab"><div className="tab-name adjust2">사용자 지정</div></div>
                <div className="tab-blank seperation"></div>
            </div>
            <div className="wrap-props">
                <div className="props-section first-section">
                <div className="file-icon" style={tempImg}></div>
                <div className="seperation" />
                <div className="file-input"><input /></div>
                </div>
                <hr />
                <div className="props-section">
                <div>
                    {
                    Object.keys(info.info).map((key) => {
                        if(key !== "date"){
                            return (
                            <div className="wrap-keyVal">
                            <div className="key">{info.info[key as keyof typeof info.info][0]}:</div>
                            <div className="value">{info.info[key as keyof typeof info.info][1]}</div>
                            </div>
                            )
                        }
                    })
                    }
                </div>
                </div>
                <hr />
                <div className="props-section">
                <div className="wrap-keyVal">
                    <div className="key">{info.info.date[0]}:</div>
                    <div className="value">{info.info.date[1]}</div>
                </div>
                </div>
                <hr />
                <div className="props-section">
                <div className="wrap-keyVal">
                    <div className="key" style={{width: "55px"}}>특성:</div>
                    <div className="value" style={{alignItems: "start"}}>
                        <Checkbox>읽기 전용</Checkbox>
                        <Checkbox>숨김</Checkbox>                    
                        <div className="button" style={{marginLeft: "91px"}}>고급</div>
                    </div>
                </div>
                </div>
            </div>          
            </div>
            <div className="about-footer">
            <div className ="button">확인</div>
            <div className ="button">취소</div>
            <div className ="button last">적용</div>
            </div>
        </div>)
}

export default AboutProperties;
