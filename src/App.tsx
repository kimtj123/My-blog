import './css/App.css';
import { Route } from 'react-router-dom';

import Main from "./components/Main/Main";
import About from "./components/About/About";
import Header from "./components/Header/Header";
import Write from "./components/Write/Write";

function App() {
  return (
    <div>
      <Header />
      <Route exact path="/" component={Main} />
      <Route exact path="/About" component={About} />
      <Route exact path="/Write" component={Write} />
    </div>
  );
}

export default App;
