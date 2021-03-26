import './css/App.css';
import { Route } from 'react-router-dom';

import Main from "./components/Main/Main";
import Header from "./components/Header/Header";

function App() {
  return (
    <div>
      <Header />
      <Route exact path="/" component={Main} />      
    </div>
  );
}

export default App;
