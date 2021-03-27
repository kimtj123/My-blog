import React from 'react';
import './Main.css';
import { Badge } from "@chakra-ui/react"

function Main() {  

  const info = [
    {
      title : "제목",
      text : "나에겐 3개의 블로그가 있다. - 맛집, 카페 등 나의 느낀 점을 쓰는 네이버 블로그 - 공부한 분야를 제 3자에게 알려주기 위한 브런치 - 관심 분야 인사이트 공유하는 워드프레스 블로그   나의 느낀점을 쓰는 네이버 블로그   2015년 12월 25일 시작한 내 최초의 블로그다. 목적은 맛집 탐방. 맛있는 음식을 걱정 없이 먹고 싶었던 나는 '네이버 블로",
      label : ["여행", "일상"],
      date : "2021-01-01",
      image : "//img1.daumcdn.net/thumb/C120x120.fpng/?fname=http://t1.daumcdn.net/brunch/service/user/VZ4/image/2DHJI4QeI0PqulO-Fe6OD1yDaUg.png"
    },
    {
      title : "제목",
      text : "제주도 여행 노션 제주도 여행 노션 제주도 여행 노션 제주도 여행 노션 제주도 여행 노션 제주도 여행 노션 제주도 여행 마지막 날이다. 일주일 중 3일은 부모님과 4일은 혼자 지냈다. 여행을 계획하고 돌아다니는 동안 느낀점 , 잘했던 점, 못했던 점을 기록하고 다음 여행에서는 더욱 스마트한 여행이 되길 바라며 이 글을 쓴다. 물론 앞으로 여행 갈 계획이 있",
      label : ["여행", "일상"],
      date : "2021-01-01",
      image : "https://img1.daumcdn.net/thumb/R720x0.q80/?scode=mtistory2&fname=http%3A%2F%2Fcfile24.uf.tistory.com%2Fimage%2F9929C0495C932BB1153D55"
    },
    {
      title : "제목",
      text : "나에겐 3개의 블로그가 있다. - 맛집, 카페 등 나의 느낀 점을 쓰는 네이버 블로그 - 공부한 분야를 제 3자에게 알려주기 위한 브런치 - 관심 분야 인사이트 공유하는 워드프레스 블로그   나의 느낀점을 쓰는 네이버 블로그   2015년 12월 25일 시작한 내 최초의 블로그다. 목적은 맛집 탐방. 맛있는 음식을 걱정 없이 먹고 싶었던 나는 '네이버 블로",
      label : ["여행", "일상"],
      date : "2021-01-01",
      image : ""
    },
  ]  

  return (
    <div className="wrap-articles">
      <ul className="articles">
        {
          info.map((info,index) => (
            <li key={index}>
              <a>
                <div className="wrap-content">
                  <div className="article-content">
                    <div className="left-width">
                      <p className="article-title">{info.title}</p>
                      <p className="article-text">{info.text}</p>
                      <div className="article-info left-width">
                        <span className="label">
                          <Badge fontSize="1rem">여행</Badge>
                        </span>
                        <span className="date">{info.date}</span>
                      </div>
                    </div>
                    <div className="img-content">
                      {
                        info.image.length !== 0 ? 
                        <img src={info.image}></img> : 
                        <div className="no-image">no-image</div>
                      }                      
                    </div>
                  </div>
                </div>
              </a>
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default Main;
