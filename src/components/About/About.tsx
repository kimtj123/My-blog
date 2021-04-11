import React from 'react';
import './About.css';
import  AboutProperties  from './About-properties'
import { blogInfo } from './AboutBasicData'


type State = {
  blogInfo:{
    kinds: string[];
    path: string[];
    stacks: string[];
    content: Array<string>;
    date: Array<string>;
  }
}
type Props = {info:number}

class About extends React.Component <Props, State>{
  state: State;

  constructor(props:any) {
    super(props);
    this.state = {
      blogInfo: blogInfo,      
    };    
  }
  
  render(){
    return (
    <div id="About">
      <div className="file-row">
        <div className="file"> </div>
      </div>
      <AboutProperties info = {blogInfo}/>
    </div>
  );}
}

export default About;
