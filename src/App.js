import './css/App.css'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Board from './pages/Board';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Home}></Route>
        <Route path='/board/:id' component={Board}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
