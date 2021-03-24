import './css/App.css';
import { Route } from 'react-router-dom';

import Main from "./Main";
import Test2 from "./Test2";

function App() {
  return (
    <div>
      <Route exact path="/" component={Main} />
      <Route path="/Test2" component={Test2} />
    </div>
  );
}

export default App;
