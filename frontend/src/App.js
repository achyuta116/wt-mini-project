import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Navbar from './Navbar';
import Home from './views/Home';
import Login from './views/Login';
import Signup from './views/Signup';
import NotFound from './views/NotFound';
import Diy from './views/Diy'
import Prebuilt from './views/Prebuilt'
import Spare from './views/Spare'
import Vendor from './views/Vendor'
import Cart from './views/Cart'
import Category from './views/Category';


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <div className="content">
          <Switch>
            <Route path="/" exact>
              <Home/>
            </Route>
            <Route path="/login">
              <Login/>
            </Route>
            <Route path="/signup">
              <Signup/>
            </Route>
            <Route path="/diy">
              <Diy/>
            </Route>
            <Route path="/spare">
              <Spare/>
            </Route>
            <Route path="/prebuilt">
              <Prebuilt/>
            </Route>
            <Route path="/vendor">
              <Vendor/>
            </Route>
            <Route path="/cart">
              <Cart/>
            </Route>
            <Route path="/diy-category/:category">
              <Category/>
            </Route>
            <Route path="*">
              <NotFound/>
            </Route>
          </Switch>
        </div>

      </div>
    </Router>
  );
}

export default App;
