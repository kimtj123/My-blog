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
  },
  clickFile: boolean
  infoPannel: boolean
}
type Props = {info:number}
const fileImg = {
  backgroundImage: `url("/static/media/favicon.635626c1.ico")`,
  border: "solid 1px var(--chakra-colors-blackAlpha-100)",
  borderRadius:"4px"
}

// const clickFileImg =  Object.assign({background: "var(--chakra-colors-whiteAlpha-300)";}, fileImg);


class About extends React.Component <Props, State>{
  state: State;

  constructor(props:any) {
    super(props);
    this.state = {
      blogInfo: blogInfo,
      clickFile: false,
      infoPannel: false
    };    
    this.clickFile = this.clickFile.bind(this);
    this.blurFile = this.blurFile.bind(this);
    this.infoPannel = this.infoPannel.bind(this);
  }
  
  clickFile() {
    console.log("click")
    this.setState({clickFile: true})
  }
  
  blurFile() {
    console.log("blur")
    this.setState({clickFile: false})
  }

  infoPannel() {
    this.setState({infoPannel: !this.state.infoPannel})
  }

  render(){
    return (
    <div id="About">
      <div className="file-row">
        <div className={!this.state.clickFile ? "file" : "file clicked"} 
            tabIndex={0}
            onClick={ this.clickFile } 
            onBlur={ this.blurFile }
            onDoubleClick={()=>{
              this.blurFile();
              this.infoPannel();
            }}
        >
          <div className="file-icon" style={fileImg}></div>
          <div className="file-name">Blog</div>
        </div>
      </div>
        { this.state.infoPannel ? <AboutProperties info = {blogInfo} switch = {this.infoPannel}/> : <div></div>}
    </div>
  );}
}

export default About;
