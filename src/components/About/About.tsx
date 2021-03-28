import React from 'react';
import './About.css';
import  AboutProperties  from './About-properties'
import { blogInfo } from './AboutBasicData'


type BlogInfo ={
  kinds: string[];
  path: string[];
  stacks: string[];
  content: Array<string>;
  date: Array<string>;
}
type Props = {info:number}
type State = {
  ct: number
}


class About extends React.Component <Props, State>{
  constructor(props:any) {
    super(props);
    this.state = {
      ct: 1
    };    
  }
  // state: State ={
  //   blogInfos: blogInfo
  // }
  render(){
    const tempImg = {
      backgroundImage: `url("/static/media/favicon.635626c1.ico")`
    }

    return (
    <div id="About">
      <div className="file-row">
        <div className="file"> </div>
      </div>
      <AboutProperties info = {this.state.ct}/>
    </div>
  );}
}

export default About;
