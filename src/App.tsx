import './css/App.css';
import { Route } from 'react-router-dom';

import Main from "./components/Main/Main";
import About from "./components/About/About";
import Header from "./components/Header/Header";

function App() {
  return (
    <div>
      <Header />
      <Route exact path="/" component={Main} />
      <Route exact path="/About" component={About} />
      {/* <Route exact path="/About" component={Main} /> */}
    </div>
  );
}

export default App;
