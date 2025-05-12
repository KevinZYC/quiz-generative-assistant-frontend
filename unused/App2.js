import Navbar from './Navbar';
import Panel from './Panel';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import List from "./List"
import Display from './Display';
import Chat from './Chat';
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
            <Panel />
            <Switch>
                <Route exact path="/">
                <List/>
                </Route>
                <Route path="/display">
                <Display/>
                </Route>
            </Switch>
            <Chat />
        </div>
      </div>
    </Router>
  );
}

export default App;
