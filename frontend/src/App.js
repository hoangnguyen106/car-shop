import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import OverlayProvider from './context/OverlayContext';
import { publicRoutes } from './routes';
import Header from './components/Layout/Header';
// import SideBar from './components/Layout/Sidebar';
import 'antd/dist/antd.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import SelectOption from './components/Layout/SelectOptions/SelectOption';

function App() {
  return (
    <Router>
      <OverlayProvider>
        <Header />
        <SelectOption />
        <Switch>
          {publicRoutes.map((route) => (
            <Route key={route.path} {...route} />
          ))}
        </Switch>
      </OverlayProvider>
    </Router>
  );
}

export default App;
